import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    FlatList
} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Reducer/Reducer';
import { Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';
import URL from '../../../UrlApi';
import axios from 'axios';

const Payment = ({ navigation, route }) => {

    const { productList } = route.params;
    const { price } = route.params;
    const user = useSelector(selectUser)
    const [addressData, setAddressData] = useState([])

    const getAddressData = () => {
        axios({
            method: 'get',
            url: `${URL}users/address?user_id=` + user._id,
        }).then((res) => {
            if (res.status === 200) {
                let data = res.data;
                setAddressData(data[0])
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    React.useEffect(() => {
        getAddressData();
    }, []);

    return (
        <View>
            <View style={styles.container}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
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
                    }}>Thanh toán</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: 5,
                        borderStyle: 'dashed',
                        borderBottomWidth: 1,
                        borderBottomColor: '#EFE3C8',
                        marginBottom: 10
                    }}>
                    <Image
                        style={{
                            width: 25,
                            height: 25,
                            resizeMode: 'contain',
                            tintColor: '#EFE3C8',
                            marginRight: 10
                        }}
                        source={{ uri: 'https://webstockreview.net/images/document-clipart-disorderly-1.png' }} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View>
                            <Text style={[styles.receive_add, { marginBottom: 5, fontSize: 19, fontWeight: 'bold' }]}>Địa chỉ nhận hàng</Text>
                            <Text style={styles.receive_add}>{user.fullname} - {user.phonenum}</Text>
                            {
                                addressData ? (
                                    <View>
                                        <Text style={styles.receive_add}>{addressData.address_details}</Text>
                                        <Text style={styles.receive_add}>{addressData.address}</Text>
                                    </View>
                                ) : (<View></View>)
                            }
                        </View>
                        <TouchableOpacity>
                            <Icon name='right' style={{ textAlignVertical: 'center' }} type='antdesign' size={25} color={'#EFE3C8'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={productList}
                    keyExtractor={(item) => item._id}
                    key={(item) => item._id}
                    renderItem={({ item }) =>
                        <View item={item} style={{
                            backgroundColor: '#362C36',
                            flexDirection: 'row',
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10
                        }}>
                            <View style={{
                                width: 65,
                                height: 65,
                                borderRadius: 10,
                                overflow: 'hidden',
                                marginRight: 10
                            }}>
                                <Image
                                    source={{ uri: item.product_id.image }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover',
                                    }}
                                />
                            </View>
                            <View style={{ width: '75%' }}>
                                <Text style={{
                                    color: '#EFE3C8',
                                    fontSize: 18,
                                }}>
                                    {item.product_id.name}
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{
                                        color: '#EFE3C8',
                                        fontSize: 15,
                                    }}>
                                        Phân loại: Màu: {item.color} - Size: {item.size}
                                    </Text>
                                    <Text style={{
                                        position: 'absolute',
                                        color: '#EFE3C8',
                                        fontSize: 15,
                                        right: 0
                                    }}>
                                        x{item.quantity}
                                    </Text>
                                </View>
                                <Text style={{
                                    color: '#EFE3C8',
                                    fontSize: 16,
                                }}>
                                    {(item.price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ
                                </Text>
                            </View>
                        </View>
                    }
                />
            </View>
        </View>
    )
}

export default Payment

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