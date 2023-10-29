import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../Redux/Reducer/Reducer'
import axios from 'axios'
import { SwipeListView } from 'react-native-swipe-list-view'
import URL from '../../../../UrlApi'
import Toast from 'react-native-toast-message'

const Address = ({ navigation }) => {
    const user = useSelector(selectUser);
    const [data, setData] = useState([]);

    const getData = () => {
        axios({
            method: 'get',
            url: `${URL}users/address?user_id=` + user._id,
        }).then((res) => {
            if (res.status === 200) {
                setData(res.data)
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    const handleDelete = ({ item }) => {
        Alert.alert('Xác nhận', 'Bạn chắc chắn muốn xóa địa chỉ này?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    axios({
                        method: 'delete',
                        url: `${URL}users/address?_id=${item._id}`,
                    }).then((res) => {
                        if (res.status == 200) {
                            Toast.show({
                                type: 'success',
                                text1: 'Thành công',
                                text2: 'Xóa địa chỉ thành công!'
                            });
                            getData();
                        }
                    }).catch((err) => {
                        Toast.show({
                            type: 'error',
                            text1: 'Thất bại',
                            text2: 'Xóa địa chỉ thất bại!'
                        });
                        console.log(err);
                    })
                }
            },
        ]);
    }

    React.useEffect(() => {
        getData();
    }, [data.length]);

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
                }}>Địa chỉ</Text>
            </View>
            <View style={{
                width: '100%',
                height: '100%',
                }}>
                {data.length == 0 ? (
                    <View>
                        <Text style={{
                            color: '#EFE3C8',
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginTop: '70%'
                        }}>Không có địa chỉ giao hàng</Text>
                    </View>
                ) : (
                    <SwipeListView
                        data={data}
                        keyExtractor={(item) => item._id}
                        key={(item) => item._id}
                        horizontal={false}
                        leftOpenValue={75}
                        renderHiddenItem={({ item }) => (
                            <View style={{
                                width: '100%',
                                height: '90%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor: '#C94C4C',
                                    width: 65,
                                    height: '100%',
                                    borderRadius: 10,
                                    justifyContent: 'center'
                                }}
                                    onPress={() => handleDelete({ item })}
                                >
                                    <Icon name='delete' type='antdesign' size={30} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        )}
                        renderItem={({ item }) =>
                            <View item={item} style={{
                                backgroundColor: '#362C36',
                                flexDirection: 'row',
                                padding: 10,
                                borderRadius: 10,
                                marginBottom: 10
                            }}>
                                <View style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#201520'
                                }}>
                                    <Image
                                        source={{ uri: 'https://wallpapercave.com/wp/wp5324598.png' }}
                                        style={{
                                            width: '70%',
                                            height: '70%',
                                            resizeMode: 'cover',
                                            tintColor: '#EFE3C8'
                                        }}
                                    />
                                </View>
                                <View style={{ width: '75%' }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            height: 26,
                                            color: '#EFE3C8',
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>
                                            {item.addressname}
                                        </Text>
                                        {item.is_default
                                            ? (<Text style={{
                                                fontSize: 15,
                                                fontWeight: 'normal',
                                                color: '#201520',
                                                backgroundColor: '#EFE3C8',
                                                marginLeft: 10,
                                                paddingVertical: 2,
                                                paddingHorizontal: 10,
                                                borderRadius: 5
                                            }}>Default</Text>)
                                            : (<View></View>)}
                                    </View>
                                    <Text style={{
                                        color: '#EFE3C8',
                                        fontSize: 18,
                                    }}>
                                        {item.address_details}, {item.address}
                                    </Text>
                                </View>
                            </View>
                        }
                    />
                )
                }
                <TouchableOpacity style={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    right: 0,
                    bottom: 50,
                    backgroundColor: '#362C36',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 70,
                    borderWidth: 2,
                    borderColor: '#EFE3C8'
                }} onPress={() => navigation.navigate('AddAddress', { dataAddress: null })}>
                    <Icon name='plus' type='antdesign' color={'#EFE3C8'} size={30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Address

const styles = StyleSheet.create({})