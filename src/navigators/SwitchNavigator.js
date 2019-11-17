import {createAppContainer} from 'react-navigation'
import {RoomStackNavigator} from './RoomStackNavigator'

export const SwitchNavigator = createAppContainer(RoomStackNavigator);