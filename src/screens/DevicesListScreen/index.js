import React, { useState, useEffect } from "react";
import styles from './styles';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import { Container, Content, Card, CardItem, Button, Fab, Item, Label, Input } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";

export default function DevicesListScreen(props) {
    const [modalDelete, setModalDelete] = useState(false);
    const [modal, setModal] = useState(false);
    const [input, setInput] = useState('');
    function onChangeToggle (value) {
    
    };

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
              <Button rounded style={styles.buttonYes} onPress={() => setModalDelete(false)}>
                <Text style={styles.textButtonDelete}>Sim</Text>
              </Button>
            </View>
          </View>
        </Modal>
      )
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

    function openModal () {
      setInput('Teste')
      setModal(true);
    };

    function saveButton () {
      setModal(false);
    }

    function openDeleteModal () {
      setModalDelete(true);
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
                  <Text>Lampada</Text>
                  <View style={styles.viewButtons}>
                  <Switch 
                    value={true} 
                    onChange={() => onChangeToggle()}         
                    thumbColor="#84dff3"
                    trackColor="#84dff3"
                    />
                    <TouchableOpacity>
                      <Button rounded style={styles.buttonEdit} onPress={() => openModal()}>
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
        <Fab position="bottomRight" style={styles.fab} onPress={() => openModal()}>
          <Text>+</Text>
        </Fab>
      </Container>
    )
};