import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Style from './ProductItemStyle'

const ProductItem = ({ item, navigation }) => {
    return (
        <TouchableOpacity style={Style.container} onPress={() => {
            navigation.navigate('Details', { item: item });
        }}>
            <View style={Style.productImage} >
                <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
            </View>
            <View style={ Style.productInfo } >
                <View style={{ width: '75%'}} >
                    <Text style={ Style.text } > {item.name} </Text>
                </View>
                <View style={ Style.addButton } >
                    <FontAwesome name='plus' style={{ fontSize: 18, color: '#201520'}} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem