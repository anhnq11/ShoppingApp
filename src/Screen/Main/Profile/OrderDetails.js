import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../../Comps/Header';

const OrderDetails = ({ route, navigation }) => {

    const { data } = route.params

    return (
        <View style={styles.container}>
            <Header name='Chi tiết đơn hàng' navigation={navigation}/>
            <FlatList
                data={data.listCart}
                keyExtractor={(item) => item.index}
                key={(item) => item.index}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <Text style={{
                            color: '#EFE3C8',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginBottom: 5
                        }}>
                            Thông tin đơn hàng
                        </Text>
                        <Text style={styles.receive_add}>Khách hàng: {data.username} - {data.phonenum}</Text>
                        <Text style={styles.receive_add}>Địa chỉ: {data.userAddress.address_details}, {data.userAddress.address}</Text>
                        <Text style={styles.receive_add}>Trạng thái đơn hàng:
                            <Text style={{
                                color: 'green',
                                fontSize: 19,
                            }}> {data.status.name}</Text></Text>
                        <Text style={{
                            color: '#EFE3C8',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginVertical: 5,
                            borderTopWidth: 1,
                            borderColor: '#EFE3C8',
                            borderStyle: 'dotted',
                            paddingTop: 5, 
                            textAlign: 'center'
                        }}>
                            Chi tiết đơn hàng
                        </Text>
                    </View>
                }
                ListFooterComponent={
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        paddingVertical: 5, 
                        marginVertical: 5,
                        borderTopWidth: 1, 
                        borderColor: '#EFE3C8',
                        borderStyle: 'dotted'
                    }}>
                        <Text style={{
                            color: '#EFE3C8',
                            fontSize: 21,
                        }}>Tổng tiền </Text>
                        <Text style={{
                            color: '#EFE3C8',
                            fontSize: 21,
                            fontWeight: 'bold'
                        }}>{(data.totalAmount).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ</Text>
                    </View>
                }
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
    )
}

export default OrderDetails

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