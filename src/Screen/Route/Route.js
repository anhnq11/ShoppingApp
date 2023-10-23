import { View, Image, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'

import logoImg from '../../../assets/png/image2.png'
import Style from './RouteStyle'

let windowWidth = Dimensions.get('window').width * 80/100;
let windowHeght = Dimensions.get('window').height * 80/100;

const Route = ({ navigation }) => {
    return (
        <View style={Style.container}>
            <View style={Style.topLayout}>
                <View style={{ width: windowWidth }}>
                    <Image source={logoImg} />
                </View>
            </View>
            <View style={Style.bottomLayout}>
                <TouchableOpacity style={Style.button} onPress={() => {
                    navigation.navigate('Login');
                }}>
                    <Text style={Style.text}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Style.button, { backgroundColor: '#201520' }]} onPress={() => {
                    navigation.navigate('Regis');
                }}>
                    <Text style={[Style.text, { color: '#EFE3C8' }]}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Route