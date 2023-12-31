import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../Redux/Reducer/Reducer'
import { useState, useEffect } from 'react'
import URL from '../../../UrlApi'
import axios from 'axios'
import Header from '../../../Comps/Header'

const OrderHistory = ({ navigation }) => {

    const user = useSelector(selectUser)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getData = () => {
        setIsLoading(true)
        axios({
            method: 'get',
            url: `${URL}products/invoices?user_id=` + user._id + `&isDone=true`,
        }).then((res) => {
            if (res.status === 200) {
                setData(res.data)
                setIsLoading(false)
            }
        }).catch((err) => {
            setIsLoading(false)
            console.log(err);
        });
    }

    React.useEffect(() => {
        getData();
    }, [data.length]);

    return (
        <View style={styles.container}>
            <View>
                <Header name='Lịch sử mua hàng' navigation={navigation} />
                {
                    isLoading
                        ? <ActivityIndicator isLoading={isLoading} size={'large'} />
                        : <View style={{ height: '95%' }}>
                            {
                                data.length == 0 ? (
                                    <Text style={[styles.receive_add, { textAlign: 'center', marginTop: '50%' }]}>Không có đơn hàng</Text>
                                ) : (
                                    <FlatList
                                        data={data}
                                        keyExtractor={(item) => item._id}
                                        key={(item => item._id)}
                                        renderItem={({ item }) =>
                                            <View>
                                                <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderDetails', { data: item })}>
                                                    <View style={{
                                                        marginBottom: 10,
                                                        backgroundColor: '#362C36',
                                                        padding: 10,
                                                        borderRadius: 10

                                                    }}>
                                                        <Text style={{
                                                            color: '#EFE3C8',
                                                            fontSize: 18,
                                                            fontWeight: 'bold',
                                                            borderBottomWidth: 1,
                                                            borderColor: '#EFE3C8',
                                                            borderStyle: 'dotted',
                                                            paddingBottom: 5
                                                        }}>{item.createdAt}</Text>
                                                        <View style={{
                                                            backgroundColor: '#362C36',
                                                            flexDirection: 'row',
                                                            borderRadius: 10,
                                                            marginVertical: 10,
                                                        }}>
                                                            <View style={{
                                                                width: 70,
                                                                height: 70,
                                                                marginRight: 10,
                                                                borderRadius: 10,
                                                                overflow: 'hidden',
                                                            }}>
                                                                <Image
                                                                    source={{ uri: item.listCart[0].product_id.image }}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        resizeMode: 'cover',
                                                                    }}
                                                                />
                                                            </View>
                                                            <View style={{ width: '75%' }}>
                                                                <Text style={{
                                                                    height: 26,
                                                                    color: '#EFE3C8',
                                                                    fontSize: 20,
                                                                    fontWeight: 'bold'
                                                                }}>
                                                                    {item.listCart[0].product_id.name}
                                                                </Text>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                }}>
                                                                    <Text style={{
                                                                        color: '#EFE3C8',
                                                                        fontSize: 17,
                                                                    }}>
                                                                        Màu:{' '}
                                                                        <Text style={{ fontWeight: 'bold' }}>
                                                                            {item.listCart[0].color}
                                                                        </Text>
                                                                        {' '}- Size:{' '}
                                                                        <Text style={{ fontWeight: 'bold' }}>
                                                                            {item.listCart[0].size}
                                                                        </Text>
                                                                    </Text>
                                                                    <Text style={{
                                                                        position: 'absolute',
                                                                        color: '#EFE3C8',
                                                                        fontSize: 17,
                                                                        right: 10
                                                                    }}>
                                                                        x{item.listCart[0].quantity}
                                                                    </Text>
                                                                </View>
                                                                <Text style={{
                                                                    color: '#EFE3C8',
                                                                    fontSize: 18,
                                                                    fontWeight: 'bold'
                                                                }}>
                                                                    {(item.listCart[0].price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        {
                                                            item.listCart.length != 1
                                                                ? <Text style={{
                                                                    color: '#EFE3C8',
                                                                    fontSize: 18,
                                                                    fontStyle: 'italic',
                                                                    borderTopWidth: 1,
                                                                    borderColor: '#EFE3C8',
                                                                    borderStyle: 'dotted',
                                                                    paddingVertical: 5,
                                                                    textAlign: 'center'
                                                                }}>Xem thêm</Text>
                                                                : <View></View>
                                                        }
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            borderTopWidth: 1,
                                                            borderBottomWidth: 1,
                                                            paddingVertical: 5,
                                                            borderColor: '#EFE3C8',
                                                            borderStyle: 'dotted',
                                                        }}>
                                                            <Text style={{
                                                                color: '#EFE3C8',
                                                                fontSize: 18,
                                                            }}>Trạng thái</Text>
                                                            <Text style={{
                                                                color: item.status.status == 5 ? 'red' : 'green',
                                                                fontSize: 17,
                                                            }}>{item.status.name}</Text>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            marginTop: 10
                                                        }}>
                                                            <Text style={{
                                                                color: '#EFE3C8',
                                                                fontSize: 20,
                                                                fontWeight: 'bold'
                                                            }}>{(item.totalAmount).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ</Text>
                                                            {
                                                                item.status.status == 4 ? (
                                                                    <TouchableOpacity style={{
                                                                        backgroundColor: '#EFE3C8',
                                                                        borderRadius: 10,
                                                                    }}
                                                                        onPress={() => updateInvoice({ item })}
                                                                    >
                                                                        <Text style={{
                                                                            color: '#201520',
                                                                            fontSize: 18,
                                                                            fontWeight: 'bold',
                                                                            paddingHorizontal: 15,
                                                                            paddingVertical: 5
                                                                        }}>Đã nhận được hàng</Text>
                                                                    </TouchableOpacity>
                                                                ) : (<View></View>)
                                                            }
                                                            {
                                                                item.status.status == 1 ? (
                                                                    <TouchableOpacity style={{
                                                                        backgroundColor: '#EFE3C8',
                                                                        borderRadius: 10,
                                                                    }}
                                                                        onPress={() => updateInvoice({ item })}
                                                                    >
                                                                        <Text style={{
                                                                            color: '#201520',
                                                                            fontSize: 18,
                                                                            fontWeight: 'bold',
                                                                            paddingHorizontal: 15,
                                                                            paddingVertical: 5
                                                                        }}>Huỷ đơn hàng</Text>
                                                                    </TouchableOpacity>
                                                                ) : (<></>)
                                                            }
                                                            {
                                                                item.status.status == 2 ? (
                                                                    <TouchableOpacity style={{
                                                                        backgroundColor: '#EFE3C8',
                                                                        borderRadius: 10,
                                                                    }}
                                                                        onPress={() => navigation.navigate('OrderDetails', { data: item })}
                                                                    >
                                                                        <Text style={{
                                                                            color: '#201520',
                                                                            fontSize: 18,
                                                                            fontWeight: 'bold',
                                                                            paddingHorizontal: 15,
                                                                            paddingVertical: 5
                                                                        }}>Chi tiết</Text>
                                                                    </TouchableOpacity>
                                                                ) : (<></>)
                                                            }
                                                            {
                                                                item.status.status == 3 ? (
                                                                    <TouchableOpacity style={{
                                                                        backgroundColor: '#EFE3C8',
                                                                        borderRadius: 10,
                                                                    }}
                                                                        onPress={() => {
                                                                            // Something here !!
                                                                        }}
                                                                    >
                                                                        <Text style={{
                                                                            color: '#201520',
                                                                            fontSize: 18,
                                                                            fontWeight: 'bold',
                                                                            paddingHorizontal: 15,
                                                                            paddingVertical: 5
                                                                        }}>Liên hệ</Text>
                                                                    </TouchableOpacity>
                                                                ) : (<></>)
                                                            }
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        }
                                    />
                                )
                            }
                        </View>
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