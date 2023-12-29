import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Header from '../../../Comps/Header';
import { useState, useEffect } from 'react';
import URL from '../../../UrlApi';
import axios from 'axios';

const SelectPaymentMethods = ({ navigation }) => {
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [paymentMethodList, setPaymentMethodList] = useState([])
    React.useEffect(() => {
        axios({
            method: 'get',
            url: `${URL}products/payment_methods`,
        }).then((res) => {
            if (res.status === 200) {
                setPaymentMethodList(res.data)
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    return (
        <View style={styles.container}>
            <Header name='Phương thức thanh toán' navigation={navigation} />
            <FlatList
                data={paymentMethodList}
                keyExtractor={(item) => item._id}
                key={(item) => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                    <TouchableWithoutFeedback onPress={() => {
                        setPaymentMethod(item)
                        navigation.navigate('Checkout', { paymentMethod: item })
                    }}>
                        <View style={{
                            paddingVertical: 5,
                            paddingHorizontal: 15,
                            backgroundColor: '#362C36',
                            borderRadius: 10,
                            marginBottom: 10,
                        }}>
                            <View>
                                <View>
                                    <Text style={{
                                        color: '#EFE3C8',
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                    }}>
                                        {item.name}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                }
            />
        </View>
    )
}

export default SelectPaymentMethods

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        paddingTop: 35,
        backgroundColor: '#201520'
    },
})