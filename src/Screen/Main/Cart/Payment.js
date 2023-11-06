import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    FlatList,
    TextInput,
    ToastAndroid
} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Reducer/Reducer';
import { Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';
import URL from '../../../UrlApi';
import axios from 'axios';
import Modal from "react-native-modal";
import CheckBox from 'react-native-check-box'

const Payment = ({ navigation, route }) => {

    const { productList } = route.params;
    const { price } = route.params;
    const user = useSelector(selectUser)
    const [addressData, setAddressData] = useState([])
    const [defaultAddress, setDefaultAddress] = useState()
    const [isVisible, setIsVisible] = useState(false)
    const [modalName, setModalName] = useState()
    const [paymentMethod, setPaymentMethod] = useState([])
    const [defaultPaymentMethods, setDefaultPaymentMethods] = useState()
    let shippingPrice = 30000;
    let totalPrice = price + shippingPrice;

    const getAddressData = () => {
        axios({
            method: 'get',
            url: `${URL}users/address?user_id=` + user._id,
        }).then((res) => {
            if (res.status === 200) {
                let data = res.data
                setAddressData(data)
                setDefaultAddress(data[0])
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const getPaymentMethods = () => {
        axios({
            method: 'get',
            url: `${URL}products/payment_methods`,
        }).then((res) => {
            if (res.status === 200) {
                setPaymentMethod(res.data)
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    const addToInvoices = () => {

        if (defaultPaymentMethods === undefined) {
            ToastAndroid.show('Vui lòng chọn phương thức thanh toán!', ToastAndroid.SHORT)
            return
        }

        const data = {
            user_id: user._id,
            username: user.fullname,
            phonenum: user.phonenum,
            listCart: productList,
            totalAmount: totalPrice,
            createdAt: new Date().toLocaleString(),
            userAddress: defaultAddress._id,
            paymentMethod: defaultPaymentMethods._id,
        }

        axios({
            method: 'post',
            url: `${URL}products/invoices`,
            data: data
        }).then((res) => {
            if (res.status == 200) {
                ToastAndroid.show('Mua hàng thành công!', ToastAndroid.SHORT)
                navigation.navigate('MainScr', { screen: 'Home' });
                axios({
                    method: 'delete',
                    url: `${URL}products/carts`,
                    data: {
                        user_id: user._id,
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        console.log('Success!');
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })

    }

    React.useEffect(() => {
        getAddressData();
        getPaymentMethods();
    }, []);

    return (
        <View>
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={
                        <View>
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
                                    width: '90%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View>
                                        <Text style={[styles.receive_add, { marginBottom: 5, fontSize: 19, fontWeight: 'bold' }]}>Địa chỉ nhận hàng</Text>
                                        <Text style={styles.receive_add}>{user.fullname} - {user.phonenum}</Text>
                                        {
                                            defaultAddress ? (
                                                <View>
                                                    <Text style={styles.receive_add}>{defaultAddress.address_details}</Text>
                                                    <Text style={styles.receive_add}>{defaultAddress.address}</Text>
                                                </View>
                                            ) : (<View></View>)
                                        }
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            right: 0
                                        }}
                                        onPress={() => {
                                            setIsVisible(true)
                                            setModalName('USER_INFO')
                                        }}>
                                        <Icon name='right' style={{ textAlignVertical: 'center' }} type='antdesign' size={25} color={'#EFE3C8'} />
                                    </TouchableOpacity>
                                    <View>
                                        <Modal isVisible={isVisible}>
                                            {
                                                modalName === 'USER_INFO' ? (
                                                    <View style={{
                                                        backgroundColor: '#201520',
                                                        borderRadius: 10,
                                                        alignItems: 'center',
                                                        padding: 10
                                                    }}>
                                                        <Text style={{
                                                            color: '#EFE3C8',
                                                            fontWeight: 'bold',
                                                            fontSize: 20
                                                        }}>Chọn địa chỉ</Text>
                                                        <FlatList
                                                            data={addressData}
                                                            keyExtractor={(item) => item._id}
                                                            key={(item) => item._id}
                                                            showsVerticalScrollIndicator={false}
                                                            renderItem={({ item }) =>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    borderBottomWidth: 1,
                                                                    borderColor: '#EFE3C8',
                                                                    paddingVertical: 5
                                                                }}>
                                                                    {
                                                                        // console.log(defaultAddress._id === item._id)
                                                                        defaultAddress._id === item._id ? (
                                                                            <CheckBox
                                                                                checkBoxColor='#EFE3C8'
                                                                                style={{
                                                                                    padding: 10,
                                                                                }}
                                                                                onClick={() => {
                                                                                    setDefaultAddress(item)
                                                                                    setIsVisible(false)
                                                                                }}
                                                                                isChecked={true}
                                                                            />
                                                                        ) : (
                                                                            <CheckBox
                                                                                checkBoxColor='#EFE3C8'
                                                                                style={{
                                                                                    padding: 10,
                                                                                }}
                                                                                onClick={() => {
                                                                                    setDefaultAddress(item)
                                                                                    setIsVisible(false)
                                                                                }}
                                                                                isChecked={false}
                                                                            />
                                                                        )
                                                                    }
                                                                    <View>
                                                                        <Text style={{
                                                                            color: '#EFE3C8',
                                                                            fontWeight: 'bold',
                                                                            fontSize: 19,
                                                                        }}>
                                                                            {item.addressname}
                                                                        </Text>
                                                                        <Text style={[styles.receive_add, { width: '80%' }]}>{item.address_details}, {item.address}</Text>
                                                                    </View>
                                                                </View>
                                                            }
                                                        />
                                                        <TouchableOpacity
                                                            onPress={() => setIsVisible(false)}
                                                            style={{
                                                                backgroundColor: '#EFE3C8',
                                                                borderRadius: 10,
                                                                marginTop: 10
                                                            }}
                                                        >
                                                            <Text style={{
                                                                fontSize: 18,
                                                                color: '#201520',
                                                                fontWeight: 'bold',
                                                                paddingHorizontal: 30,
                                                                paddingVertical: 5
                                                            }}>
                                                                Close
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <View style={{
                                                        backgroundColor: '#201520',
                                                        borderRadius: 10,
                                                        alignItems: 'center',
                                                        padding: 10
                                                    }}>
                                                        <Text style={{
                                                            color: '#EFE3C8',
                                                            fontWeight: 'bold',
                                                            fontSize: 20
                                                        }}>Phương thức thanh toán</Text>
                                                        <FlatList
                                                            data={paymentMethod}
                                                            keyExtractor={(item) => item._id}
                                                            key={(item) => item._id}
                                                            showsVerticalScrollIndicator={false}
                                                            renderItem={({ item }) =>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    borderBottomWidth: 1,
                                                                    borderColor: '#EFE3C8',
                                                                    paddingVertical: 5
                                                                }}>
                                                                    {
                                                                        // console.log(defaultAddress._id === item._id)
                                                                        (defaultPaymentMethods && defaultPaymentMethods._id === item._id) ? (
                                                                            <CheckBox
                                                                                checkBoxColor='#EFE3C8'
                                                                                style={{
                                                                                    padding: 10,
                                                                                }}
                                                                                onClick={() => {
                                                                                    setDefaultPaymentMethods(item)
                                                                                    setIsVisible(false)
                                                                                }}
                                                                                isChecked={true}
                                                                            />
                                                                        ) : (
                                                                            <CheckBox
                                                                                checkBoxColor='#EFE3C8'
                                                                                style={{
                                                                                    padding: 10,
                                                                                }}
                                                                                onClick={() => {
                                                                                    setDefaultPaymentMethods(item)
                                                                                    setIsVisible(false)
                                                                                }}
                                                                                isChecked={false}
                                                                            />
                                                                        )
                                                                    }
                                                                    <View>
                                                                        <Text style={[styles.receive_add, { width: '100%' }]}>{item.name}</Text>
                                                                    </View>
                                                                </View>
                                                            }
                                                        />
                                                        <TouchableOpacity
                                                            onPress={() => setIsVisible(false)}
                                                            style={{
                                                                backgroundColor: '#EFE3C8',
                                                                borderRadius: 10,
                                                                marginTop: 10
                                                            }}
                                                        >
                                                            <Text style={{
                                                                fontSize: 18,
                                                                color: '#201520',
                                                                fontWeight: 'bold',
                                                                paddingHorizontal: 30,
                                                                paddingVertical: 5
                                                            }}>
                                                                Close
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }
                                        </Modal>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                    data={productList}
                    keyExtractor={(item) => item._id}
                    key={(item) => item._id}
                    showsVerticalScrollIndicator={false}
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
                    ListFooterComponent={
                        <View style={{ width: '100%', marginBottom: '15%' }}>
                            <View
                                style={{
                                    paddingVertical: 10,
                                    marginVertical: 10,
                                    borderTopWidth: 1,
                                    borderStyle: 'dashed',
                                    borderColor: '#EFE3C8'
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25,
                                                tintColor: '#EFE3C8',
                                                resizeMode: 'contain',
                                                marginRight: 10
                                            }}
                                            source={{ uri: 'https://webstockreview.net/images/coin-clipart-dollar-sign-13.png' }} />
                                        <Text style={[styles.receive_add, { marginBottom: 5, fontSize: 19, fontWeight: 'bold' }]}> Phương thức thanh toán</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        setIsVisible(true)
                                        setModalName('PAYMENT_METHODS')
                                    }}>
                                        <Icon name='right' style={{}} type='antdesign' size={25} color={'#EFE3C8'} />
                                    </TouchableOpacity>
                                </View>
                                {
                                    defaultPaymentMethods ? (
                                        <Text style={[styles.receive_add, { marginLeft: 35 }]}>{defaultPaymentMethods.name}</Text>
                                    ) : (
                                        <Text style={{
                                            marginLeft: 35,
                                            fontSize: 16,
                                            color: 'red',
                                            fontStyle: 'italic'
                                        }}>
                                            * Chọn phương thức thanh toán
                                        </Text>
                                    )
                                }
                            </View>
                            {/*  */}
                            <View
                                style={{
                                    paddingVertical: 10,
                                    borderTopWidth: 1,
                                    borderStyle: 'dashed',
                                    borderColor: '#EFE3C8'
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: '#EFE3C8',
                                            resizeMode: 'contain',
                                            marginRight: 10,
                                            marginBottom: 5
                                        }}
                                        source={{ uri: 'https://cdn4.iconfinder.com/data/icons/simplicity-vector-icon-set/512/bill.png' }} />
                                    <Text style={[styles.receive_add, { marginBottom: 5, fontSize: 19, fontWeight: 'bold' }]}> Chi tiết thanh toán</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text style={styles.receive_add}>Tổng tiền hàng</Text>
                                    <Text style={styles.receive_add}>{price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text style={styles.receive_add}>Phí vận chuyển</Text>
                                    <Text style={styles.receive_add}>{shippingPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text style={[styles.receive_add, { fontWeight: 'bold' }]}>Tổng thanh toán</Text>
                                    <Text style={[styles.receive_add, { fontWeight: 'bold' }]}>{totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ</Text>
                                </View>
                            </View>
                            {/*  */}
                            <View
                                style={{
                                    paddingVertical: 10,
                                    borderTopWidth: 1,
                                    borderStyle: 'dashed',
                                    borderColor: '#EFE3C8'
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    width: '90%'
                                }}>
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: '#EFE3C8',
                                            resizeMode: 'contain',
                                            marginRight: 10,
                                            marginBottom: 5
                                        }}
                                        source={{ uri: 'https://cdn4.iconfinder.com/data/icons/simplicity-vector-icon-set/512/bill.png' }} />
                                    <Text style={styles.receive_add}> Nhấn đặt hàng đồng nghĩa với việc bạn đồng ý với
                                        <Text style={[styles.receive_add, { fontWeight: 'bold' }]}> Điều khoản sử dụng </Text>
                                        của chúng tôi.</Text>
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
            <View style={{
                width: '100%',
                padding: 5,
                paddingHorizontal: 20,
                backgroundColor: '#38232A',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                position: 'absolute',
                bottom: 0,
            }}>

                <View style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View>
                        <Text style={{
                            color: '#EFE3C8',
                            fontSize: 15
                        }}>
                            Tổng thanh toán:
                        </Text>
                        <Text style={{
                            color: '#EFE3C8',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>
                            {totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ
                        </Text>
                    </View>
                    <TouchableOpacity style={{
                        width: '50%',
                        backgroundColor: '#EFE3C8',
                        borderRadius: 10,
                        marginTop: 5,
                    }}
                        onPress={() => {
                            addToInvoices()
                        }}
                    >
                        <Text style={{
                            color: '#362C36',
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 15
                        }}>
                            Đặt hàng
                        </Text>
                    </TouchableOpacity>
                </View>
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
    },
    input: {
        width: '100%',
        borderRadius: 20,
        borderColor: '#EFE3C8',
        color: '#EFE3C8',
        borderWidth: 2,
        marginBottom: 10,
        fontSize: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
})