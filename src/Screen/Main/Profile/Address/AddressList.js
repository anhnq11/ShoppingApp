import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Pressable, ToastAndroid } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../../../Comps/Header'


const AddressList = ({ navigation }) => {

    const [data, setData] = useState([])
    const [dataType, setDataType] = useState('p')
    const [divisionCode, setDivisionCode] = useState('0')
    const [province, setprovince] = useState(null)
    const [provinceId, setprovinceId] = useState('0')
    const [district, setDistrict] = useState(null)
    const [districtId, setDistrictId] = useState('0')
    const [ward, setWard] = useState(null)
    const [wardId, setWardId] = useState('0')
    const [error, setError] = useState(null)

    const dataAddress = ward + ', ' + district + ', ' + province;

    useEffect(() => {
        const fetchDataDistricts = async () => {
            try {
                const response = await axios(
                    `https://mall.shopee.vn/api/v4/location/get_child_division_list?use_case=shopee.account&division_id=${divisionCode}`,
                );
                setData(response.data.data.divisions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataDistricts();
    }, [divisionCode]);

    const itemClick = ({ item }) => {
        switch (dataType) {
            case 'p': {
                setprovince(item.division_name)
                setprovinceId(item.id)
                setDivisionCode(item.id)
                setDistrict(null)
                setDistrictId('0')
                setWard(null)
                setWardId('0')
                setDataType('d')
                setError(null)
            }
                break
            case 'd': {
                setDivisionCode(item.id)
                setDistrict(item.division_name)
                setDistrictId(item.id)
                setWard(null)
                setWardId('0')
                setDataType('w')
                setError(null)
            }
                break
            case 'w': {
                setWard(item.division_name)
                setError(null)
                if (province && district && ward) {
                    console.log('Donee' + dataAddress);
                    navigation.navigate('AddAddress', {
                        address: dataAddress
                    })
                }
                else {
                    if (!province) {
                        setDataType('p')
                    }
                    else if (!district) {
                        setDataType('d')
                    }
                    else if (!ward) {
                        setDataType('w')
                    }
                }
            }
                break
        }
    }

    const addAddress = () => {
        if (province && district && ward) {
            navigation.navigate('AddAddress', {
                address: dataAddress
            })
        }
        else {
            setError('Vui lòng chọn đúng địa chỉ!')
        }
    }

    const changeDataType = (dataType) => {
        setDataType(dataType);
        if (dataType === 'p') {
            setDivisionCode('0');
        }
        if (dataType === 'd' && province) {
            setDivisionCode(provinceId);
        }
        if (dataType === 'w' && district) {
            setDivisionCode(districtId);
        }
    }

    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#201520',
            padding: 20,
            paddingTop: 35,
            alignItems: 'center',
        }}>
            <Header name='Địa chỉ' navigation={navigation}/>
            <View style={{
                width: '100%'
            }}>
                {/*  */}
                <Pressable onPress={() => changeDataType('p')}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5
                    }}>
                        <View style={{
                            width: 13,
                            height: 13,
                            backgroundColor: 'green',
                            borderRadius: 13,
                            marginRight: 15
                        }}></View>
                        <Text style={{
                            color: '#EFE3C8',
                            fontSize: 20
                        }}>{
                                province ? (<Text>{province}</Text>) : (<Text>Tỉnh/Thành phố</Text>)
                            }</Text>
                    </View>
                </Pressable>
                {/*  */}
                {
                    province ?
                        (<Pressable onPress={() => changeDataType('d')}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 5
                            }}>
                                <View style={{
                                    width: 13,
                                    height: 13,
                                    backgroundColor: 'green',
                                    borderRadius: 13,
                                    marginRight: 15
                                }}></View>
                                <Text style={{
                                    color: '#EFE3C8',
                                    fontSize: 20
                                }}>{
                                        district ? (<Text>{district}</Text>) : (<Text>Quận/Huyện</Text>)
                                    }</Text>
                            </View>
                        </Pressable>)
                        : (<View></View>)
                }
                {/*  */}
                {
                    district ?
                        (<Pressable onPress={() => changeDataType('w')}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 5
                            }}>
                                <View style={{
                                    width: 13,
                                    height: 13,
                                    backgroundColor: 'green',
                                    borderRadius: 13,
                                    marginRight: 15
                                }}></View>
                                <Text style={{
                                    color: '#EFE3C8',
                                    fontSize: 20
                                }}>{
                                        ward ? (<Text>{ward}</Text>) : (<Text>Xã/Phường/Thị trấn</Text>)
                                    }</Text>
                            </View>
                        </Pressable>)
                        : (<View></View>)
                }
                {/*  */}
                <View style={{
                    marginVertical: 10,
                    height: '75%',
                    backgroundColor: '#EFE3C8',
                    borderRadius: 10
                }}>
                    <FlatList
                        data={data}
                        ListEmptyComponent={<ActivityIndicator />}
                        keyExtractor={item => item.id}
                        renderItem={(item) => (
                            <TouchableOpacity onPress={() => itemClick(item)}>
                                <View style={{
                                    paddingHorizontal: 15,
                                    borderBottomWidth: 1,
                                    borderColor: '#201520'
                                }}>
                                    <Text style={{
                                        color: '#201520',
                                        fontSize: 17,
                                        marginVertical: 5,
                                    }}>{item.item.division_name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
            <View style={{
                width: '100%',
                position: 'absolute',
                bottom: 10
            }}>
                {
                    error ? (<Text style={{
                        color: 'red',
                        fontSize: 17,
                        textAlign: 'center',
                        marginBottom: 10
                    }}>{error}</Text>) : (<View></View>)
                }
                <TouchableOpacity style={{
                    width: '100%',
                    backgroundColor: '#EFE3C8',
                    marginBottom: 10,
                    borderRadius: 20,
                    paddingVertical: 4,
                    borderColor: '#EFE3C8',
                    borderWidth: 2,
                }} onPress={() => {
                    // Check account
                    addAddress();
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 20,
                        color: '#201520'
                    }}>Thêm địa chỉ</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default AddressList