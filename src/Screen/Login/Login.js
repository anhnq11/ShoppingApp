import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import logoImg from '../../../assets/png/image2.png'
import Style from './LoginStyle'
import URL from '../../UrlApi'
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Reducer/Reducer'

let windowWidth = Dimensions.get('window').width * 80 / 100;

const Login = ({ navigation }) => {

  const dispatch = useDispatch();

  const [userName, setuserName] = useState('anhnq');
  const [passWord, setpassWord] = useState('123');
  const [errorText, seterrorText] = useState('');

  // Kiểm tra tài khoản người dùng đăng nhập
  const checkLogin = () => {
    let checkLogin = true;

    if (userName === '' || passWord === '') {
      seterrorText('*Vui lòng nhập Tên đăng nhập và Mật khẩu!')
      checkLogin = false;
    }
    else{
      seterrorText('');
    }

    if (checkLogin) {
      let mUrl = URL + 'users/login?username=' + userName + '&password=' + passWord;
      fetch(mUrl)
        .then(response => response.json())
        .then(data => {
          if(data.status !== 404){
            dispatch(login(data));
            saveUserData(data);
            seterrorText('');
            Alert.alert('Thông báo', 'Đăng nhập thành công!');
            navigation.navigate('MainScr');
          }
          else{
            seterrorText('Tên đăng nhập hoặc Mật khẩu không chính xác!');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

    // Lưu thông tin người dùng khi đăng nhập thành công
  const saveUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Lỗi khi lưu thông tin người dùng:', error);
    }
  };

  return (
    <View style={Style.container}>
      <View style={Style.topLayout}>
        <View style={{ width: windowWidth }}>
          <Image source={logoImg} />
        </View>
      </View>
      <View style={Style.bottomLayout}>
        <Text style={Style.headerText}>Đăng nhập</Text>
        <TextInput type="text" placeholder='Tên đăng nhập...' placeholderTextColor={'#EFE3C8'} style={Style.input} onChangeText={(text) => { setuserName(text) }} />
        <TextInput type="text" placeholder='Mật khẩu...' secureTextEntry={true} placeholderTextColor={'#EFE3C8'} style={Style.input} onChangeText={(text) => { setpassWord(text) }} />
        {
          (errorText) ? <Text style={Style.errorText} > {errorText} </Text> : <View></View>
        }
        <TouchableOpacity style={Style.button} onPress={() => {
          // Check account
          checkLogin();
        }}>
          <Text style={Style.text}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={[Style.headerText, { fontSize: 20 }]}>- Hoặc đăng nhập với -</Text>
        <TouchableOpacity style={Style.loginBox}>
          <View style={Style.loginImgBox}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png' }} style={Style.loginImg} />
          </View>
          <Text style={Style.loginLabel}>Đăng nhập với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.loginBox}>
          <View style={Style.loginImgBox}>
            <Image source={{ uri: 'https://www.booksonb.com/sites/booksonb.indiecommerce.com/files/Facebook-logo_0.png' }} style={Style.loginImg} />
          </View>
          <Text style={Style.loginLabel}>Đăng nhập với Facebook</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }} >
          <Text style={[Style.headerText, { fontSize: 17, fontWeight: 'normal' }]}>Bạn chưa có tài khoản</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Regis')
          }}>
            <Text style={[Style.headerText, { fontSize: 17, fontWeight: 'bold' }]}> Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login