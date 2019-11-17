import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import SplashScreen from "../screens/SplashScreen";
import RoomListScreen from "../screens/RoomListScreen"
import DevicesListScreen from "../screens/DevicesListScreen"

export const RoomStackNavigator = createStackNavigator(
    {
        ['SPLASH_SCREEN']: {
            screen: SplashScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        ['ROOM_LIST_SCREEN']: {
            screen: RoomListScreen,
            navigationOptions: () => ({
                headerBackTitle: 'Voltar',
                title: 'Cômodos',
                headerStyle: {
                    backgroundColor: '#84dff3',
                },
                headerTintColor: '#fff',
            })
        },
        ['DEVICES_LIST_SCREEN']: {
            screen: DevicesListScreen,
            navigationOptions: () => ({
                headerBackTitle: 'Voltar',
                title: 'Dispositivos',
                headerStyle: {
                    backgroundColor: '#84dff3',
                },
                headerTintColor: '#fff',
            })
        },
    },
    {
        initialRouteName: 'SPLASH_SCREEN',
    }
);