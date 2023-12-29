import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Header from '../../../Comps/Header';
import CheckBox from 'react-native-check-box';
import { useState } from 'react';

const SelectAddress = ({ route, navigation }) => {
    const data = route.params;
    const [address, setAddress] = useState(data.defaultAddress)
    return (
        <View style={styles.container}>
            <Header name='Địa chỉ giao hàng' navigation={navigation} />
            <FlatList
                data={data.addressData}
                keyExtractor={(item) => item._id}
                key={(item) => item._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                    <TouchableWithoutFeedback onPress={() => {
                        setAddress(item)
                        navigation.navigate('Checkout', { address: item })
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 5,
                            backgroundColor: '#362C36',
                            borderRadius: 10,
                            marginBottom: 10,
                        }}>
                            {
                                address._id === item._id ? (
                                    <CheckBox
                                        checkBoxColor='#EFE3C8'
                                        style={{
                                            padding: 15,
                                        }}
                                        isChecked={true}
                                        onClick={() => {

                                        }}
                                    />
                                ) : (
                                    <CheckBox
                                        checkBoxColor='#EFE3C8'
                                        style={{
                                            padding: 15,
                                        }}
                                        isChecked={false}
                                        onClick={() => {

                                        }}
                                    />
                                )
                            }
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        color: '#EFE3C8',
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                    }}>
                                        {item.addressname}
                                    </Text>
                                    {item.is_default ?
                                        <View style={{
                                            marginLeft: 10,
                                            backgroundColor: '#201520',
                                            paddingHorizontal: 10,
                                            borderRadius: 5
                                        }}>
                                            <Text style={{
                                                color: '#EFE3C8',
                                                fontWeight: 'bold',
                                                fontSize: 13
                                            }}>
                                                Default
                                            </Text>
                                        </View> : <View></View>
                                    }
                                </View>
                                <Text style={{
                                    color: '#EFE3C8',
                                    fontSize: 15,
                                    width: '90%',
                                }}>{item.address_details}, {item.address}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                }
            />
        </View>
    )
}

export default SelectAddress

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        paddingTop: 35,
        backgroundColor: '#201520'
    },
})