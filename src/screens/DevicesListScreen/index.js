import React, { useState, useEffect } from "react";
import styles from './styles';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import { Container, Content, Card, CardItem, Button, Fab, Item, Label, Input } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import {setData, getData} from '../../services';

export default function DevicesListScreen(props) {
    const [modalDelete, setModalDelete] = useState(false);
    const [modal, setModal] = useState(false);
    const [input, setInput] = useState('');
    const [roomList, setRoomList] = useState([]);
    const [deviceSelected, setDeviceSelected] = useState(-1);
    const [roomSelected, setRoomSelected] = useState(0);
    const [loading, setLoading] = useState(true)

    /*
      Guardar indice da sala selecionada
      Buscar lista
    */
    useEffect(() => {
      let roomIndex = props.navigation.getParam('roomIndex');
      setRoomSelected(roomIndex)
      getDeviceList()
    }, [])

    // Buscar lista no storage
    const getDeviceList = async () => {
      let roomList = await getData();
      setRoomList(roomList);
      setLoading(false)
    }

    // Editar status do dispositivo selecionado e atualizar a lista
    const onChangeToggle = async(indexDevice, valueStatus) => {
      roomList[roomSelected].devices[indexDevice].status = !valueStatus
      await setData(roomList)
      await getDeviceList()
    };

    // Modal de confirmação de remoção do dispositivo
    function confirmDeleteModal () {
      return (
        <Modal
        animationType="slide"
        isVisible={modalDelete}
        onBackdropPress={() => setModalDelete(false)}
        >
          <View style={styles.viewModal}>
            <View>
              <Text style={styles.textConfirmDelete}>Você realmente deseja deletar este dispositivo do cômodo?</Text>
            </View>
            <View style={styles.buttonsConfirm}>
              <Button rounded style={styles.buttonNo} onPress={() => setModalDelete(false)}>
                <Text style={styles.textButtonDelete}>Não</Text>
              </Button>
              <Button rounded style={styles.buttonYes} onPress={() => deleteDevice()}>
                <Text style={styles.textButtonDelete}>Sim</Text>
              </Button>
            </View>
          </View>
        </Modal>
      )
    };

    // Função de remoção do dispositivo e atualizar lista
    const deleteDevice = async () => {
      roomList[roomSelected].devices.splice(deviceSelected,1);
      await setData(roomList);
      await getDeviceList();
      setModalDelete(false);
    }

    // Modal de inserção/edição do dispositivo
    function modalComponent () {
      return (
        <Modal
          animationType="slide"
          isVisible={modal}
          onBackdropPress={() => setModal(false)}
        >
          <View style={styles.viewModal}>
            <Item floatingLabel>
              <Label>Nome</Label>
              <Input value={input} onChangeText={(value) => setInput(value)}/>
            </Item>
            <View style={styles.buttonsModal}>
              <Button rounded style={styles.buttonSave} onPress={() => saveButton()}>
                <Text style={styles.textButtonSave}>Salvar</Text>
              </Button>
            </View>
          </View>
        </Modal>
      )
    }

    // Abrir modal de inserção/edição
    function openModal (roomName, index) {
      setDeviceSelected(index)
      setInput(roomName)
      setModal(true);
    };


    /*
      Verificar se tem dispositivo selecionado para saber se irá fazer a inserção ou edição,
      e atualizar a lista.
    */
    const saveButton = async() => {
      if(deviceSelected !== -1) {
        roomList[roomSelected].devices[deviceSelected].device = input
        await setData(roomList);
      }else {
        roomList[roomSelected].devices.push({device: input, status: false});
        await setData(roomList);
      }
      await getDeviceList();
      setModal(false);
    }

    // Abrir modal de confirmação de remoção do dispositivo
    function openDeleteModal (index) {
      setModalDelete(true);
      setDeviceSelected(index)
    }

    // Abrir modal de inserção/edição especificando que irá ser de inserção
    const newDevice = () => {
      setDeviceSelected(-1)
      setInput('')
      setModal(true);
    }

    return (
      <Container>
        {modalComponent()}
        {confirmDeleteModal()}
        <Content padder>
          {
            !loading &&
              roomList[roomSelected].devices.map((item, index) => (
                <Card style={styles.card} key={index}>
                  <CardItem style={styles.cardItem}>
                    <Text>{item.device}</Text>
                    <View style={styles.viewButtons}>
                    <Switch 
                      value={item.status} 
                      onChange={() => onChangeToggle(index, item.status)}         
                      thumbColor="#84dff3"
                      trackColor="#84dff3"
                      />
                      <TouchableOpacity>
                        <Button rounded style={styles.buttonEdit} onPress={() => openModal(item.device, index)}>
                          <Icon name="pencil" size={20} color="#fff" />
                        </Button>
                      </TouchableOpacity>                    
                      <TouchableOpacity>
                        <Button rounded style={styles.buttonDelete} onPress={() => openDeleteModal()}>
                          <Icon name="trash-o" size={20} color="#fff"/>
                        </Button>
                      </TouchableOpacity>
                    </View>
                  </CardItem>
                </Card>
            ))
          }
        </Content>
        <Fab position="bottomRight" style={styles.fab} onPress={() => newDevice()}>
          <Text>+</Text>
        </Fab>
      </Container>
    )
};