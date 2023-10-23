import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useState, useEffect } from 'react'
import axios from 'axios'


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
            }
                break
            case 'd': {
                setDivisionCode(item.id)
                setDistrict(item.division_name)
                setDistrictId(item.id)
                setWard(null)
                setWardId('0')
                setDataType('w')
            }
                break
            case 'w': {
                setWard(item.division_name)
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
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10
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
                }}>Địa chỉ</Text>
            </View>
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
                    height: '80%',
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
        </View>
    )
}

export default AddressList