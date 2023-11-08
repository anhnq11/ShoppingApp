import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../Redux/Reducer/Reducer'
import { useState, useEffect } from 'react'
import URL from '../../../UrlApi'
import axios from 'axios'

const OrderHistory = ({ navigation }) => {

    const user = useSelector(selectUser)
    const [data, setData] = useState([])

    const getData = () => {
        axios({
            method: 'get',
            url: `${URL}products/invoices?user_id=` + user._id + `&isDone=true`,
        }).then((res) => {
            if (res.status === 200) {
                setData(res.data)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    React.useEffect(() => {
        getData();
    }, [data.length]);

    return (
        <View style={styles.container}>
            <View>
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
                        width: '90%',
                        color: '#EFE3C8',
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>Lịch sử mua hàng</Text>
                </View>
                {
                    data.length == 0 ? (
                        <Text style={[styles.receive_add]}>Không có đơn hàng</Text>
                    ) : (
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item._id}
                            key={(item => item._id)}
                            renderItem={({ item }) =>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderColor: '#EFE3C8',
                                    borderStyle: 'dotted',
                                    marginBottom: 10,
                                    paddingBottom: 5
                                }}>
                                    <Text style={{
                                        color: '#EFE3C8',
                                        fontSize: 18,
                                        fontWeight: 'bold',

                                    }}>{item.createdAt}</Text>
                                    <Text style={styles.receive_add}>{item.userAddress.address_details}, {item.userAddress.address}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={{
                                            color: 'green',
                                            fontSize: 17,
                                        }}>{item.status.name}</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', { data: item })}>
                                            <Text style={{ color: '#EFE3C8', fontSize: 16, fontStyle: 'italic' }}>Chi tiết {'>'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: 5
                                    }}>
                                        <Text style={{
                                            color: '#EFE3C8',
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>{(item.totalAmount).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ</Text>
                                                <TouchableOpacity style={{
                                                    backgroundColor: '#EFE3C8',
                                                    borderRadius: 10,
                                                }}
                                                    onPress={() => {
                                                        Alert.alert('Thông báo', 'Vui lòng thử lại sau!', [
                                                            {
                                                              text: 'Cancel',
                                                              onPress: () => console.log('Cancel Pressed'),
                                                              style: 'cancel',
                                                            }
                                                          ]);
                                                    }}
                                                >
                                                    <Text style={{
                                                        color: '#201520',
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        paddingHorizontal: 15,
                                                        paddingVertical: 5
                                                    }}>Đánh giá sản phẩm</Text>
                                                </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        />
                    )
                }
            </View>
        </View>
    )
}

export default OrderHistory

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        paddingTop: 35,
        backgroundColor: '#201520'
    },
    receive_add: {
        fontSize: 17,
        color: '#EFE3C8',
        flexWrap: 'wrap',
    }
})