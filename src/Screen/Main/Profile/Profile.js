import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../Redux/Reducer/Reducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({ navigation }) => {

  const user = useSelector(selectUser)

  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#201520',
      padding: 10,
      paddingTop: 35,
    }}>
      <View style={{
        backgroundColor: '#EFE3C8',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: 30,
        padding: 10
      }}>
        <View style={{
          width: 100,
          height: 100,
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {
            user.image ? (
              <Image
                source={{ uri: user.image }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover'
                }}
              />
            ) : (
              <Image
                source={{ uri: 'https://th.bing.com/th/id/OIP.4NKHCiIt5eVTkmhWokCqJAHaHa?pid=ImgDet&w=640&h=640&rs=1' }}
                style={{
                  width: '70%',
                  height: '70%',
                  resizeMode: 'cover'
                }}
              />
            )
          }
        </View>
        <View style={{
          marginLeft: 10,
          justifyContent: 'center',
        }}>
          <Text
            style={{
              fontSize: 25,
              color: '#201520',
              fontWeight: 'bold'
            }}
          >
            {user.fullname}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: '#201520',
            }}
          >
            {user.email}
          </Text>
          <TouchableOpacity style={{
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#201520',
            width: 150,
            marginTop: 5
          }}>
            <Text style={{
              color: '#201520',
              textAlign: 'center',
              fontSize: 16
            }}>
              Edit account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity style={styles.itemBox} onPress={() => navigation.navigate('AccountDetails')}>
            <Text style={styles.itemText}>Chi tiết tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemBox} onPress={() => navigation.navigate('Address')}>
            <Text style={styles.itemText}>Địa chỉ giao hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemBox}>
            <Text style={styles.itemText}>Theo dõi đơn hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemBox}>
            <Text style={styles.itemText}>Lịch sử mua hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemBox}>
            <Text style={styles.itemText}>Cài đặt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.itemBox, { borderBottomWidth: 2 }]}
            onPress={() => {
              Alert.alert('Đăng xuất', 'Bạn chắc chắn muốn đăng xuất!', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK', onPress: () => {
                    // dispatch(logout())
                    AsyncStorage.clear()
                    navigation.navigate('Login')
                  }
                },
              ]);
            }}
          >
            <Text style={styles.itemText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  itemBox: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#362C36',
    borderRadius: 10,
    marginBottom: 10,

  },
  itemText: {
    color: '#EFE3C8',
    fontSize: 22,
    fontWeight: 'bold',
  }
})