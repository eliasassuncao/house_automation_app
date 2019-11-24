import React, { useState, useEffect } from "react";
import styles from './styles';
import {View, Text, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Button, Fab, Item, Label, Input } from "native-base";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import {setData, getData} from '../../services';

export default function RoomListScreen(props) {
    const [modal, setModal] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const [modalDelete, setModalDelete] = useState(false);
    const [input, setInput] = useState('');
    const [roomSelected, setRoomSelected] = useState(-1);

    //Navegar para a tela de dispositivos, mandando o indice da sala
    function viewDevices (roomIndex) {
      props.navigation.push('DEVICES_LIST_SCREEN', {roomIndex: roomIndex})
    };

    // Modal de Criar/Editar cômodo
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

    // Modal de confirmar a remoção do cômodo
    function confirmDeleteModal () {
        return (
          <Modal
          animationType="slide"
          isVisible={modalDelete}
          onBackdropPress={() => setModalDelete(false)}
          >
            <View style={styles.viewModal}>
              <View>
                <Text style={styles.textConfirmDelete}>Você realmente deseja deletar este cômodo?</Text>
              </View>
              <View style={styles.buttonsConfirm}>
                <Button rounded style={styles.buttonNo} onPress={() => setModalDelete(false)}>
                  <Text style={styles.textButtonDelete}>Não</Text>
                </Button>
                <Button rounded style={styles.buttonYes} onPress={() => deleteRoom()}>
                  <Text style={styles.textButtonDelete}>Sim</Text>
                </Button>
              </View>
            </View>
          </Modal>
        )
    };


    /* 
      - Deletar cômodo com base no dispositivo selecionado
      - Guardar novo JSON no storage
      - Atualizar minha lista de cômodos
    */
    const deleteRoom = async () => {
      roomList.splice(roomSelected, 1);
      await setData(roomList);
      await getRoomList();
      setModalDelete(false);
    }

    // Abrir modal de inserção/edição do cômodo
    function openModal (roomName, index) {
      setRoomSelected(index)
      setInput(roomName)
      setModal(true);
    };

    // Abrir modal de remoção do cômodo
    function openDeleteModal (index) {
      setModalDelete(true);
      setRoomSelected(index)
    }

    /*
      Verificar se tem cômodo selecionado para saber se irá fazer a inserção ou edição,
      e atualizar a lista.
    */
    const saveButton = async () => {
      if(roomSelected !== -1) {
        roomList[roomSelected].room = input
        await setData(roomList)
      }else {
        roomList.push({room: input, devices:[]})
        await setData(roomList)
      }
      await getRoomList();
      setModal(false);
    }

    // Buscar lista no storage ao abrir a tela
    useEffect (() => {
      getRoomList()
    }, [])

    // função de buscar lista no storage
    const getRoomList = async () => {
      let value = await getData();
      setRoomList(value);
    }

    // Abrir modal de inserção/edição especificando que irá ser de inserção
    const newRoom = () => {
      setInput('')
      setModal(true);
      setRoomSelected(-1)
    }

    return (
      <Container>
        {modalComponent()}
        {confirmDeleteModal()}
        <Content padder>
          {
            roomList.map((item, index) => (
              <Card style={styles.card} key={index}>
                <CardItem style={styles.cardItem}>
                  <Text>{item.room}</Text>
                  <View style={styles.viewButtons}>
                    <TouchableOpacity>
                      <Button onPress={() => viewDevices(index)} rounded style={styles.buttonEye}>
                        <Icon name="eye" size={20} color="#fff" />
                      </Button>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Button rounded style={styles.buttonEdit} onPress={() => openModal(item.room, index)}>
                        <Icon name="pencil" size={20} color="#fff" />
                      </Button>
                    </TouchableOpacity>                    
                    <TouchableOpacity>
                      <Button rounded style={styles.buttonDelete} onPress={() => openDeleteModal(index)}>
                        <Icon name="trash-o" size={20} color="#fff" />
                      </Button>
                    </TouchableOpacity>
                  </View>
                </CardItem>
              </Card>
            ))
          }
        </Content>
        <Fab position="bottomRight" style={styles.fab} onPress={() => newRoom()}>
          <Text>+</Text>
        </Fab>
      </Container>
    )
};