import React, { UserState, useEffect } from "react";
import styles from './styles'
import {View, Text, Image, ActivityIndicator} from 'react-native';
import { Container, Content } from "native-base";

// Tela de Splash
export default function SplashScreen(props) {

    useEffect(() => {
      setTimeout(() => {
        props.navigation.replace('ROOM_LIST_SCREEN')
      }, 2000)
    });

    return (
      <Container>
        <View style={styles.container}
        >
            <Image 
                source={require('../../../public/images/house-splash.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <ActivityIndicator color="#ff0f0fcc" size="large"/>
        </View>
      </Container>
    )
};