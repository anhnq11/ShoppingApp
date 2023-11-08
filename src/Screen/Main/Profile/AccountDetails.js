import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser } from '../../../Redux/Reducer/Reducer'
import * as ImagePicker from 'expo-image-picker';
import URL from '../../../UrlApi'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmail, isPhoneNumber } from '../../../validate'

const AccountDetails = ({ navigation }) => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [image, setImage] = useState(user.image)
    const [fullname, setFullname] = useState(user.fullname)
    const [phonenum, setPhonenum] = useState(user.phonenum)
    const [email, setEmail] = useState(user.email)
    const [error, setError] = useState(null)

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const handleUpdate = async () => {

        setError(null);
        
        if(!fullname || !phonenum || !email){
            setError('Vui lòng điền đầy đủ thông tin!')
            return;
        }

        if ( !isEmail(email) || !isPhoneNumber(phonenum) ){
            setError('Số điện thoại hoặc Email không đúng định dạng!')
            return;
        }

        const data = {
            _id: user._id,
            fullname: fullname,
            phonenum: phonenum,
            email: email,
            image: image
        }

        await axios({
            method: 'post',
            url: `${URL}users/update`,
            data: data
        })
            .then((res) => {
                if (res.status == 200) {
                    dispatch(login(res.data))
                    saveUserData(res.data)
                    ToastAndroid.show('Cập nhật thông tin thành công!', ToastAndroid.SHORT)
                    navigation.goBack();
                    return;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // Lưu thông tin người dùng khi đăng nhập thành công
    const saveUserData = async (userData) => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
            console.error('Lỗi khi lưu thông tin người dùng:', error);
        }
    };

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
            <View>
                <Image
                    source={{ uri: image ? image : "https://th.bing.com/th/id/R.55393befef8a75d3a59d25ee7931d60f?rik=Dmwko1HbUCWZ7w&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fpowerpoint-user-icon-59.png&ehk=zkEtxliUAs%2fFgrsCJuqa4qWXNltwnt8b9%2fyMoGmWSYU%3d&risl=&pid=ImgRaw&r=0" }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        marginTop: 30
                    }}
                />
                <TouchableOpacity onPress={() => chooseImage()}>
                    <Image
                        source={{ uri: "https://cdn1.iconfinder.com/data/icons/user-fill-icons-set/144/User003_Edit-512.png" }}
                        style={{
                            width: 35,
                            height: 35,
                            tintColor: '#EFE3C8',
                            position: 'absolute',
                            bottom: -5,
                            right: -5,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <Text style={{
                width: '100%',
                color: '#EFE3C8',
                fontSize: 22,
                marginTop: 10,
                fontWeight: 'bold'
            }}>
                Thông tin cá nhân
            </Text>
            {
                error ? (
            <Text style={{
                width: '100%',
                color: 'red',
                fontSize: 17,
                marginTop: 10,
                fontStyle: 'italic'
            }}>
                *{ error }
            </Text>
                ) : (<View></View>)
            }
            <TextInput
                type="text"
                placeholder='Họ và tên...'
                value={fullname}
                placeholderTextColor={'#EFE3C8'}
                style={styles.input}
                onChangeText={(text) => { setFullname(text) }} />
            <TextInput
                type="text"
                placeholder='Số điện thoại...'
                value={phonenum}
                placeholderTextColor={'#EFE3C8'}
                style={styles.input}
                onChangeText={(text) => { setPhonenum(text) }} />
            <TextInput
                type="text"
                placeholder='Email...'
                value={email}
                placeholderTextColor={'#EFE3C8'}
                style={styles.input}
                onChangeText={(text) => { setEmail(text) }} />
            <TouchableOpacity style={styles.button} onPress={() => { handleUpdate() }}>
                <Text style={styles.text}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AccountDetails

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderRadius: 20,
        borderColor: '#EFE3C8',
        color: '#EFE3C8',
        borderWidth: 2,
        marginTop: 10,
        fontSize: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    button: {
        width: '100%',
        backgroundColor: '#EFE3C8',
        marginTop: 10,
        borderRadius: 20,
        paddingVertical: 1,
        borderColor: '#EFE3C8',
        borderWidth: 2,
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        color: '#201520'
    },
})