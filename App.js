import React, {Component} from 'react'
import {SwitchNavigator} from './src/navigators'
import {View} from 'react-native'
import {Root} from 'native-base'

export default function App() {
  return (
    <Root>
      <SwitchNavigator/>
    </Root>
  )
}