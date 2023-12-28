import { StyleSheet, Text, TextInput, TouchableOpacity, View, Switch, Touchable, TouchableWithoutFeedback, Pressable } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../Redux/Reducer/Reducer';
import axios from 'axios';
import URL from '../../../../UrlApi';
import Toast from 'react-native-toast-message';
import Header from '../../../../Comps/Header';


const AddAddress = ({ route, navigation }) => {

  const user = useSelector(selectUser);
  const { address } = route.params;

  const [addressname, setAddressname] = useState(null)
  const [address_details, setAddress_details] = useState(null)
  const [isDefault, setIsDefault] = useState(false)
  const [error, setError] = useState(false)

  const handleAddress = () => {

    if (!addressname || !address_details || !address) {
      setError(true)
      return
    }
    axios({
      method: 'post',
      url: `${URL}users/address`,
      data: {
        user_id: user._id,
        addressname: addressname,
        address: address,
        address_details: address_details,
        is_default: isDefault,
      }
    }).then((res) => {
      if (res.status == 200) {
        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Thêm địa chỉ thành công!'
        });
        navigation.navigate('Address')
      }
      else {
        Toast.show({
          type: 'error',
          text1: 'Thất bại',
          text2: 'Thêm địa chỉ thất bại!'
        });
      }
    })
  }

  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#201520',
      padding: 20,
      paddingTop: 35,
      alignItems: 'center'
    }}>
      <Header name='Thêm địa chỉ' navigation={navigation} />
      <View style={{
        width: '100%',
        height: '97%',
      }}>
        {
          error ? (
            <Text style={{
              color: 'red',
              fontSize: 15,
              fontStyle: 'italic',
            }}>* Vui lòng nhập đầy đủ thông tin!</Text>
          ) : (<View></View>)
        }
        <TextInput
          type="text"
          placeholder='Tên Địa chỉ...'
          placeholderTextColor={'#EFE3C8'}
          style={styles.input}
          onChangeText={(text) => {
            setAddressname(text)
            setError(false)
          }}
        />
        <TextInput
          type="text"
          placeholder='Số nhà, Tên đường,...'
          placeholderTextColor={'#EFE3C8'}
          style={styles.input}
          onChangeText={(text) => {
            setAddress_details(text)
            setError(false)
          }}
        />{
        }
        <Pressable onPress={() => {
          navigation.navigate('AddressList')
          setError(false)
        }}>
          <TextInput
            editable={false}
            type="text"
            placeholder='Địa chỉ giao hàng...'
            value={address}
            placeholderTextColor={'#EFE3C8'}
            style={styles.input}
          />
        </Pressable>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          <Text style={{
            color: '#EFE3C8',
            fontSize: 18,
            marginRight: 5
          }}>
            Đặt làm mặc định
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDefault ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(val) => setIsDefault(val)}
            value={isDefault}
          />
        </View>
        <View style={{
          width: '100%',
          position: 'absolute',
          bottom: 10
        }}>
          <TouchableOpacity style={styles.button} onPress={handleAddress}>
            <Text style={styles.text}>Thêm địa chỉ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AddAddress

const styles = StyleSheet.create({
  input: {
    borderRadius: 20,
    borderColor: '#EFE3C8',
    color: '#EFE3C8',
    borderWidth: 2,
    marginTop: 15,
    fontSize: 17,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#EFE3C8',
    marginBottom: 10,
    borderRadius: 20,
    paddingVertical: 4,
    borderColor: '#EFE3C8',
    borderWidth: 2,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 23,
    color: '#201520'
  }
})