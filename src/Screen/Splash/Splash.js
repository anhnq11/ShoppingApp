import { View, Image } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Reducer/Reducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

import logoImg from '../../../assets/png/image2.png'
import Style from './SplashStyle'

let windowWidth = Dimensions.get('window').width * 80 / 100;

const Splash = ({ navigation }) => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    setTimeout( async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        dispatch(login(JSON.parse(userData)));
        navigation.navigate('MainScr');
      }
      else {
        navigation.navigate('Route');
      }
    }, 3000);
  }, []);
  
  return (
    <View style={Style.container}>
      <View style={{ width: windowWidth }}>
        <Image source={logoImg} />
      </View>
    </View>
  )
}

export default Splash