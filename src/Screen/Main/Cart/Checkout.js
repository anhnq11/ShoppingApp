import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    FlatList,
    ToastAndroid,
    TouchableWithoutFeedback
} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Reducer/Reducer';
import { Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';
import URL from '../../../UrlApi';
import axios from 'axios';
import Header from '../../../Comps/Header'
import { useIsFocused } from '@react-navigation/native';

const Checkout = ({ navigation, route }) => {

    const isFocused = useIsFocused();
    const user = useSelector(selectUser)
    const [productList, setProductList] = useState(route.params.productList)
    const [price, setPrice] = useState(route.params.price)
    const [addressData, setAddressData] = useState([])
    const [defaultAddress, setDefaultAddress] = useState(null)
    const [addressError, setAddressError] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [paymentMethodError, setPaymentMethodError] = useState(null)

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
                if (!defaultAddress) {
                    setDefaultAddress(data[0])
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const addToInvoices = () => {

        if (!defaultAddress) {
            setAddressError('* Vui lòng chọn địa chỉ giao hàng!')
            return
        }

        if (!paymentMethod) {
            setPaymentMethodError('* Vui lòng chọn phương thức thanh toán!')
            return
        }

        let listCart = [];
        productList.forEach(item => {
            const itemData = {
                color: item.color,
                price: item.price,
                quantity: item.quantity,
                size: item.size,
                product_id: item.product_id,
            };
            listCart.push(itemData);
        });

        const address = {
            address: defaultAddress.address,
            address_details: defaultAddress.address_details,
            addressname: defaultAddress.addressname,
        }

        const data = {
            user_id: user._id,
            username: user.fullname,
            phonenum: user.phonenum,
            listCart: listCart,
            totalAmount: totalPrice,
            createdAt: new Date().toLocaleString(),
            userAddress: address,
            paymentMethod: paymentMethod.name,
        }

        // console.log(data)
        // return

        axios({
            method: 'post',
            url: `${URL}products/invoices`,
            data: data
        }).then((res) => {
            if (res.status == 200) {
                ToastAndroid.show('Mua hàng thành công!', ToastAndroid.SHORT)
                navigation.navigate('MainScr', { screen: 'Home' });
            }
        }).catch((err) => {
            console.log(err)
        })

    }

    React.useEffect(() => {
        getAddressData();
    }, []);

    React.useEffect(() => {
        if (isFocused && route.params.address) {
            setDefaultAddress(route.params.address);
            setAddressError(null)
        }
    }, [isFocused]);

    React.useEffect(() => {
        if (isFocused && route.params.paymentMethod) {
            setPaymentMethod(route.params.paymentMethod);
            setPaymentMethodError(null)
        }
    }, [isFocused]);

    return (
        <View>
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={
                        <View>
                            <Header name='Thanh toán' navigation={navigation} />
                            <TouchableOpacity
                                onPress={() => {
                                    if (addressData.length) {
                                        navigation.navigate('SelectAddress', { addressData: addressData, defaultAddress: defaultAddress })
                                    }
                                    else { navigation.navigate('AddAddress', { data: null }) }
                                }}
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
                                    <View style={{ width: '95%' }}>
                                        <Text style={[styles.receive_add, { marginBottom: 5, fontSize: 19, fontWeight: 'bold' }]}>Địa chỉ nhận hàng</Text>
                                        {
                                            defaultAddress ? (
                                                <View>
                                                    <Text style={styles.receive_add}>{user.fullname} - {user.phonenum}</Text>
                                                    <Text style={styles.receive_add}>{defaultAddress.address_details + ', ' + defaultAddress.address}</Text>
                                                </View>
                                            ) : (<View></View>)
                                        }
                                        {
                                            addressError ? (<Text style={{
                                                fontSize: 16,
                                                color: 'red',
                                                fontStyle: 'italic',
                                            }}>
                                                {addressError}
                                            </Text>) : (<View></View>)
                                        }
                                    </View>
                                    <View
                                        style={{
                                            right: 0
                                        }}
                                    >
                                        <Icon name='right' style={{ textAlignVertical: 'center' }} type='antdesign' size={25} color={'#EFE3C8'} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    data={productList}
                    keyExtractor={(item) => item._id}
                    key={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <TouchableWithoutFeedback item={item} onPress={() => navigation.navigate('Details', { item: item.product_id })}>
                            <View style={{
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
                        </TouchableWithoutFeedback>
                    }
                    ListFooterComponent={
                        <View style={{ width: '100%', marginBottom: '15%' }}>
                            <TouchableWithoutFeedback onPress={() => {
                                navigation.navigate('SelectPaymentMethods')
                            }}>
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
                                            <Text style={[styles.receive_add, { fontSize: 19, fontWeight: 'bold' }]}> Phương thức thanh toán</Text>
                                        </View>
                                        <Icon name='right' style={{}} type='antdesign' size={25} color={'#EFE3C8'} />
                                    </View>
                                    {
                                        paymentMethod ? (
                                            <Text style={[styles.receive_add, { marginLeft: 35 }]}>{paymentMethod.name}</Text>
                                        ) : (<View></View>)
                                    }
                                    {
                                        paymentMethodError ? (<Text style={{
                                            marginLeft: 35,
                                            fontSize: 16,
                                            color: 'red',
                                            fontStyle: 'italic'
                                        }}>
                                            {paymentMethodError}
                                        </Text>) : (<View></View>)
                                    }
                                </View>
                            </TouchableWithoutFeedback>
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

export default Checkout

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