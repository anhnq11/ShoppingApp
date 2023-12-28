import { View, Text, Image, ScrollView, FlatList, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Reducer/Reducer';

import Style from './HomeStyle'
import logoImg from '../../../../assets/png/image2.png';
import URL from '../../../UrlApi';
import ProductItem from '../../../Comps/ProductItem/ProductItem';
import SwiperComp from '../../../Comps/Swiper/SwiperComp';
import axios from 'axios';
let windowWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {
  const user = useSelector(selectUser);
  const isFocused = useIsFocused()

  const [isLoading, setIsLoading] = useState(false);
  const [favoursList, setfavoursList] = useState([]);
  const [newProducts, setNewProducts] = useState([])
  const [recentOrder, setRecentOrder] = useState([])

  // Lấy danh sách các sản phẩm yêu thích
  const getFavours = () => {
    let mUrl = URL + 'products/favours?user_id=' + user._id;
    fetch(mUrl)
      .then(response => response.json())
      .then(json => {
        if (json) {
          setfavoursList(json);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  const getNewProducts = () => {
    axios({
      method: 'get',
      url: `${URL}products/newproducts`,
    }).then((res) => {
      if (res.status === 200) {
        setNewProducts(res.data)
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const getRecentOrder = () => {
    axios({
      method: 'get',
      url: `${URL}products/recentOrder?user_id=` + user._id,
    }).then((res) => {
      if (res.status === 200) {
        setRecentOrder(res.data)
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const getData = () => {
    setIsLoading(true)
    Promise.all([getFavours(), getNewProducts(), getRecentOrder()])
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log('Something went wrong!' + err);
      });
  }

  React.useEffect(() => {
    const tabPress = navigation.addListener('tabPress', (e) => {
      getData()
    });
    getData()
    return tabPress;
  }, [navigation]);

  React.useEffect(() => {
    if(isFocused){
      getData()
    }
  }, [ isFocused ]);

  return (
    <SafeAreaView>
      <View style={[Style.container, { width: windowWidth, height: '100%' }]} >
        < ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData} />}>
          {/* Top layout */}
          <View style={Style.topLayout} >
            {/* Left layout */}
            <View style={Style.leftLayout} >
              <View>
                <Image style={{ width: 220, resizeMode: 'contain' }} source={logoImg} />
              </View>
            </View>
            {/* Right layout */}
            <View style={Style.rightLayout} >
              <View style={Style.imgAvatar} >
                {
                  user.image ? (
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: user.image }} />
                  ) : (
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: 'https://th.bing.com/th/id/OIP.4NKHCiIt5eVTkmhWokCqJAHaHa?pid=ImgDet&w=640&h=640&rs=1' }} />
                  )
                }
              </View>
            </View>
          </View>
          <Text style={Style.text} >Xin chào, <Text style={[Style.text, { fontWeight: 'bold' }]} >{user.fullname}</Text> </Text>
          {/* Bottom layout */}
          <View style={{
            height: 200,
            marginTop: 10
          }}>
            <SwiperComp></SwiperComp>
          </View>
          {
            isLoading ? <ActivityIndicator size={'large'} style={{ marginTop: 20 }} /> :
              <View style={Style.bottomLayout} >
                <View>
                  {
                    favoursList.length > 0 ? (
                      <View>
                        <Text style={Style.listHeader} >Yêu thích</Text>
                        <View>
                          <FlatList
                            data={favoursList}
                            keyExtractor={(item) => item._id}
                            key={(item) => item._id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) =>
                              <ProductItem item={item.product_id} navigation={navigation} />
                            }
                          />
                        </View>
                      </View>
                    ) : (<View></View>)
                  }
                  <View>
                    <Text style={Style.listHeader} >Sản phẩm mới</Text>
                    <View>
                      <FlatList
                        data={newProducts}
                        keyExtractor={(item) => item._id}
                        key={(item) => item._id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) =>
                          <ProductItem item={item} navigation={navigation} />
                        }
                      />
                    </View>
                  </View>
                  {
                    recentOrder.length > 0 ? (
                      <View>
                        <Text style={Style.listHeader} >Mua gần đây</Text>
                        <View>
                          <FlatList
                            data={recentOrder}
                            keyExtractor={(item) => item._id}
                            key={(item) => item._id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) =>
                              <ProductItem item={item.product_id} navigation={navigation} />
                            }
                          />
                        </View>
                      </View>
                    ) : (<View></View>)
                  }
                </View>
              </View>
          }
        </ ScrollView >
      </View>
    </SafeAreaView>
  )
}

export default Home