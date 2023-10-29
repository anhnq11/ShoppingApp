import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import image2 from '../../../assets/png/image2.png'
import { isPhoneNumber } from '../../validate'
import URL from '../../UrlApi'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../../Redux/Reducer/Reducer'
import { saveUserData } from '../../Services/auth'

const Regis = ({ navigation }) => {

  const dispatch = useDispatch();

  const [userName, setUserName] = useState(null)
  const [phoneNum, setPhoneNum] = useState(null)
  const [password, setPassword] = useState(null)
  const [rePassword, setRePassword] = useState(null)
  const [error, setError] = useState(null)

  const handleRegis = async () => {
    setError(null)

    console.log(userName, ' - ', phoneNum, ' - ', password);

    if (userName == null || phoneNum == null || password == null || rePassword == null) {
      setError('* Vui lòng nhập đủ thông tin!')
      return;
    }
    else if (!isPhoneNumber(phoneNum)) {
      setError('* Số điện thoại không đúng định dạng!')
      return;
    }
    else if (password.length < 8) {
      setError('* Mật khẩu phải lớn hơn 8 ký tự!')
      return;
    }
    else if (password != rePassword) {
      setError('* Xác thực mật khẩu không chính xác!')
      return;
    }

    await axios({
      method: 'get',
      url: `${URL}users/checkRegis?phonenum=` + phoneNum,
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log(res.status);
          setError('* Số điện thoại đã được sử dụng!')
          return;
        }
        else {
          axios({
            method: 'post',
            url: `${URL}users/regis`,
            data: {
              fullname: userName,
              phonenum: phoneNum,
              password: password
            }
          }).then((res) => {
            if (res.status == 200) {
              dispatch(login(res.data))
              saveUserData(res.data)
              setError(null)
              Alert.alert('Thông báo', ' Đăng ký tài khoản thành công!');
              navigation.navigate('MainScr')
            }
          }).catch(error => {
            console.error(error);
            // Alert.alert('Thông báo', ' Đăng ký tài khoản thất bại!');
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{
        width: '70%',
        marginTop: 50
      }}>
        <Image style={{
          width: '100%',
          resizeMode: 'contain'
        }}
          source={image2} />
      </View>
      <Text style={{
        color: '#EFE3C8',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 50
      }}>
        Đăng ký
      </Text>
      <Text style={{
        color: '#EFE3C8',
        fontSize: 18,
        marginBottom: 30
      }}>
        Tạo một tài khoản mới
      </Text>
      {
        error ? (<Text style={{
          color: '#EFE3C8',
          fontSize: 16,
          color: 'red',
          marginBottom: 5
        }}>
          {error}
        </Text>) : (<Text></Text>)
      }

      <TextInput
        type="text"
        placeholder='Họ và tên...'
        placeholderTextColor={'#EFE3C8'}
        style={styles.input}
        onChangeText={(text) => {
          setUserName(text)
          setError(null)
        }}
      />
      <TextInput
        type="text"
        placeholder='Số điện thoại...'
        placeholderTextColor={'#EFE3C8'}
        style={styles.input}
        onChangeText={(text) => {
          setPhoneNum(text)
          setError(null)
        }}
      />
      <TextInput
        type="text"
        secureTextEntry={true}
        placeholder='Mật khẩu...'
        placeholderTextColor={'#EFE3C8'}
        style={styles.input}
        onChangeText={(text) => {
          setPassword(text)
          setError(null)
        }}
      />
      <TextInput
        type="text"
        secureTextEntry={true}
        placeholder='Xác nhận mật khẩu...'
        placeholderTextColor={'#EFE3C8'}
        style={styles.input}
        onChangeText={(text) => {
          setRePassword(text)
          setError(null)
        }}
      />
      <TouchableOpacity style={{
        backgroundColor: '#EFE3C8',
        marginBottom: 10,
        borderRadius: 20,
        paddingVertical: 3,
        borderColor: '#EFE3C8',
        borderWidth: 2,
      }}
        onPress={handleRegis}
      >
        <Text style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 25,
          color: '#201520'
        }}>
          Đăng ký
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
        <Text style={{
          fontSize: 17,
          fontWeight: 'normal',
          color: '#EFE3C8',
        }}>
          Bạn đã có tài khoản
        </Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Login')
        }}>
          <Text style={{
            fontSize: 17,
            fontWeight: 'bold',
            color: '#EFE3C8',
          }}>
            {' '}Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Regis

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#201520',
    padding: 10
  },
  input: {
    width: '100%',
    borderRadius: 20,
    borderColor: '#EFE3C8',
    color: '#EFE3C8',
    borderWidth: 2,
    marginBottom: 15,
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
})