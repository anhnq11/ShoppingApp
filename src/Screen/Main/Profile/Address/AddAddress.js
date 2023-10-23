import { StyleSheet, Text, TextInput, TouchableOpacity, View, Switch, Touchable, TouchableWithoutFeedback, Pressable } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../Redux/Reducer/Reducer';
import axios from 'axios';
import URL from '../../../../UrlApi';
import Toast from 'react-native-toast-message';


const AddAddress = ({ route, navigation }) => {

  const user = useSelector(selectUser);
  const { address } = route.params;

  const [addressname, setAddressname] = useState(null)
  const [address_details, setAddress_details] = useState(null)
  const [isDefault, setIsDefault] = useState(false)
  const [error, setError] = useState(false)

  const handleAddress = () => {

    if(!addressname || !address_details || !address){
      setError(true)
      return
    }

    console.log(addressname, ' - ', address_details, ' - ', address, ' - ', isDefault);
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
      <View style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
      }}>
        <TouchableOpacity style={{ width: '10%' }} onPress={() => navigation.goBack()}>
          <Icon name='arrowleft' type='antdesign' size={30} color={'#EFE3C8'} />
        </TouchableOpacity>
        <Text style={{
          width: '80%',
          color: '#EFE3C8',
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>Thêm địa chỉ</Text>
      </View>
      <View style={{
        width: '100%',
        height: '97%',
      }}>
        {
          error ? (
            <Text style={{
              color: 'red',
              fontSize: 18
            }}>* Vui lòng nhập đầy đủ thông tin!</Text>
          ):(<View></View>)
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
            placeholder='Tỉnh/Thành phố, Quận/Huyện, Xã/Phường'
            value={address}
            placeholderTextColor={'#EFE3C8'}
            style={[styles.input, { fontSize: 16 }]}
          />
        </Pressable>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          <Text style={{
            color: '#EFE3C8',
            fontSize: 17,
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
    marginTop: 20,
    fontSize: 20,
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