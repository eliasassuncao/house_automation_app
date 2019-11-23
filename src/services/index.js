import AsyncStorage from '@react-native-community/async-storage';

const setData = async (data) => {
    try {
        await AsyncStorage.setItem('ROOM_LIST', JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('ROOM_LIST') || []
      return (typeof data === 'object') ? data : JSON.parse(data)
    } catch(e) {
        console.log(e)
    }
  }
  
  export {
    getData,
    setData
  }