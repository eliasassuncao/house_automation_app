import {StyleSheet} from "react-native";

export default StyleSheet.create({
    card: {
        height: 80
    },
    cardItem: {
        display: 'flex', 
        justifyContent: 'space-between'
    },
    viewButtons: {
        display: 'flex', 
        flexDirection: 'row'
    },
    buttonEye: {
        width: 30, 
        height: 30,
        marginRight: 5, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#84dff3'
    },
    buttonEdit: {
        width: 30, 
        height: 30,
        marginRight: 5, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#ffc14f'
    },
    buttonDelete: {
        width: 30, 
        height: 30, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#ff7676'
    },
    fab: {
        backgroundColor:'#ff7676' 
    },
    viewModal: {
        width: '100%', 
        height: 200, 
        backgroundColor: '#fff', 
        padding: 40
    },
    buttonsModal: {
        width: '100%', 
        display: 'flex', 
        alignItems: 'flex-end',
        marginTop: 25
    },
    buttonSave: {
        width: 70, 
        height: 30, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#84dff3'
    },
    textButtonSave: {
        color: '#fff', 
        fontSize: 15
    },
    textConfirmDelete: {
        fontSize: 16,
        textAlign: 'center'
    },
    buttonsConfirm: {
        width: '100%', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        flexDirection: 'row',
    },
    buttonYes: {
        width: 70, 
        height: 30, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#84dff3'
    },
    buttonNo: {
        width: 70, 
        height: 30, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#ff7676',
        marginRight: 30
    },
    textButtonDelete: {
        color: '#fff',
        fontSize: 15
    }

});