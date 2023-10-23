import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../Redux/Reducer/Reducer'

const AccountDetails = ({ navigation }) => {
    const user = useSelector(selectUser);
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
                }}>Trang cá nhân</Text>
            </View>
            <View style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    overflow: 'hidden',
                    marginTop: 30
                }}>
                    <Image
                        source={{ uri: user.image }}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover'
                        }}
                    />
                </View>
            <Text style={{
                color: '#EFE3C8',
                fontSize: 30,
                marginTop: 10,
                fontWeight: 'bold'
            }}>
                {user.fullname}
            </Text>
            <Text style={{
                color: '#EFE3C8',
                fontSize: 20,
                marginTop: 10
            }}>
                {user.email}
            </Text>
        </View>
    )
}

export default AccountDetails

const styles = StyleSheet.create({})