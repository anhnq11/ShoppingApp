import { Text, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'
import React from 'react'

const Header = ({ navigation, name }) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        }}>
            {
                navigation ?
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name='arrowleft' type='antdesign' size={30} color={'#EFE3C8'} />
                    </TouchableOpacity> : <View></View>
            }
            <Text style={{
                width: navigation ? '90%' : '100%',
                color: '#EFE3C8',
                fontSize: 25,
                fontWeight: 'bold',
                textAlign: 'center',
            }}>{name}</Text>
        </View>
    )
}

export default Header