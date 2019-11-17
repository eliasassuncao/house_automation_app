import React, { useState, useEffect } from "react";
import styles from './styles';
import {View, Text, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Button, Fab, Item, Label, Input } from "native-base";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RoomListScreen(props) {
    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [input, setInput] = useState('');
    function viewDevices () {
      props.navigation.push('DEVICES_LIST_SCREEN')
    };

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
              <Input value={input} onChange={(valueChanged) => setInput(valueChanged)}/>
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
                <Button rounded style={styles.buttonYes} onPress={() => setModalDelete(false)}>
                  <Text style={styles.textButtonDelete}>Sim</Text>
                </Button>
              </View>
            </View>
          </Modal>
        )
    };


    function openModal () {
      setInput('Teste')
      setModal(true);
    };

    function openDeleteModal () {
      setModalDelete(true);
    }

    function saveButton () {
      setModal(false);
    }

    return (
      <Container>
        {modalComponent()}
        {confirmDeleteModal()}
        <Content padder>
          {
            [1,2,3,4].map((value, index) => (
              <Card style={styles.card} key={index}>
                <CardItem style={styles.cardItem}>
                  <Text>Cozinha</Text>
                  <View style={styles.viewButtons}>
                    <TouchableOpacity>
                      <Button onPress={() => viewDevices()} rounded style={styles.buttonEye}>
                        <Icon name="eye" size={20} color="#fff" />
                      </Button>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Button rounded style={styles.buttonEdit} onPress={() => openModal()}>
                        <Icon name="pencil" size={20} color="#fff" />
                      </Button>
                    </TouchableOpacity>                    
                    <TouchableOpacity>
                      <Button rounded style={styles.buttonDelete} onPress={() => openDeleteModal()}>
                        <Icon name="trash-o" size={20} color="#fff" />
                      </Button>
                    </TouchableOpacity>
                  </View>
                </CardItem>
              </Card>
            ))
          }
        </Content>
        <Fab position="bottomRight" style={styles.fab} onPress={() => openModal()}>
          <Text>+</Text>
        </Fab>
      </Container>
    )
};