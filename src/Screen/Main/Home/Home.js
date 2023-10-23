import { View, Text, Image, ScrollView, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Redux/Reducer/Reducer';

import Style from './HomeStyle'
import logoImg from '../../../../assets/png/image2.png';
import URL from '../../../UrlApi';
import ProductItem from '../../../Comps/ProductItem/ProductItem';
import SwiperComp from '../../../Comps/Swiper/SwiperComp';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  const user = useSelector(selectUser);

  const [isLoading, setisLoading] = useState(false);
  const [favoursList, setfavoursList] = useState([]);

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

  React.useEffect(() => {
    const tabPress = navigation.addListener('tabPress', (e) => {
      getFavours();
    });

    getFavours();

    return tabPress;
  }, [navigation]);

  return (
    <SafeAreaView>
      <View style={[Style.container, { width: windowWidth, height: windowHeight }]} >
        < ScrollView >
          {/* Top layout */}
          <View style={ Style.topLayout } >
            {/* Left layout */}
            <View style={Style.leftLayout} >
              <View>
                <Image style={{ width: 220, resizeMode: 'contain' }} source={logoImg} />
              </View>
              <Text style={Style.text} >Xin chào, <Text style={[Style.text, { fontWeight: 'bold' }]} >{user.fullname}</Text> </Text>
            </View>
            {/* Right layout */}
            <View style={Style.rightLayout} >
              <View style={Style.imgAvatar} >
                <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: user.image }} />
              </View>
            </View>
          </View>
          {/* Bottom layout */}
          <View style={Style.bottomLayout} >
            <SwiperComp></SwiperComp>
            <View>
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
                      <ProductItem inHome={true} item={item.product_id} />
                    }
                  />
                </View>
              </View>
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
                      <ProductItem inHome={true} item={item.product_id} />
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </ ScrollView >
      </View>
    </SafeAreaView>
  )
}

export default Home