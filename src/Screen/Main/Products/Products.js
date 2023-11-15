import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Style from './ProductsStyle'

import URL from '../../../UrlApi';
import ProductItem from '../../../Comps/ProductItem/ProductItem';
import { selectUser } from '../../../Redux/Reducer/Reducer';
import axios from 'axios';

const Products = ({ navigation }) => {

  const user = useSelector(selectUser);

  const [productList, setProductList] = useState([])
  const [listCats, setListCats] = useState([])
  const [queryText, setQueryText] = useState(null)
  const [queryData, setQueryData] = useState([])
  const [active, setActive] = useState(null)

  const getProducts = () => {
    axios({
      method: 'get',
      url: `${URL}products/products`,
    }).then((res) => {
      if (res.status === 200) {
        setProductList(res.data)
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const getListCats = () => {
    axios({
      method: 'get',
      url: `${URL}products/categories`,
    }).then((res) => {
      if (res.status === 200) {
        setListCats(res.data)
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleSearch = (text) => {
    const formattedText = text.toLowerCase();
    const rs = productList.filter((item) => (item.name).toLowerCase().includes(formattedText));
    setQueryData(rs)
  }

  const filterCategory = (text) => {
    setQueryText(text)
    const rs = productList.filter((item) => (item.id_cat._id) == text)
    setQueryData(rs)
  }

  React.useEffect(() => {
    const tabPress = navigation.addListener('tabPress', (e) => {
      getProducts();
      getListCats()
    });

    getProducts();
    getListCats()
    return tabPress;
  }, [navigation]);

  return (
    <View style={Style.container} >
      <View >
        {/* Top layout */}
        <View style={Style.topLayout} >
          {/* Left layout */}
          <View style={Style.leftLayout} >
            <Text style={Style.text} >Cửa hàng</Text>
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
        {/* Bottom layout */}
        <View style={Style.bottomLayout} >
          <View style={Style.searchBox} >
            <FontAwesome name='search' style={Style.searchContent} />
            <TextInput type="text"
              placeholder='Tìm kiếm sản phẩm...'
              placeholderTextColor={'#EFE3C8'}
              style={[Style.searchContent, { marginLeft: 10 }]}
              onChangeText={(text) => {
                handleSearch(text)
                setQueryText(text)
                setActive(null)
              }}
            />
          </View>
          <View>
            <FlatList
              data={listCats}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) =>
                <TouchableOpacity style={{
                  borderWidth: 1,
                  borderColor: '#EFE3C8',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  marginRight: 5,
                  marginBottom: 10,
                  backgroundColor: (item._id == active) ? '#EFE3C8' : '#201520'
                }}
                  onPress={() => { 
                    if(active == null){
                      setActive(item._id)
                      filterCategory(item._id)
                    } else {
                      if(active == item._id){
                        setActive(null)
                        setQueryText(null)
                      } else {
                        setActive(item._id)
                        filterCategory(item._id)
                      }
                    }
                    }}
                >
                  <Text style={{
                    color: (item._id == active) ? '#201520' : '#EFE3C8',
                    fontSize: 18
                  }}>{item.name}</Text>
                </TouchableOpacity>
              }
            />
            {
              queryText && queryData.length == 0 ? (<Text style={{
                marginTop: '50%',
                textAlign: 'center',
                color: '#EFE3C8',
                fontSize: 21
              }}>Không có sản phẩm nào!</Text>) : (
                <FlatList
                  data={queryText ? queryData : productList}
                  keyExtractor={(item) => item._id}
                  key={(item) => item._id}
                  horizontal={false}
                  numColumns={2}
                  renderItem={({ item }) =>
                    <ProductItem item={item} navigation={navigation} />
                  }
                />
              )
            }
          </View>
        </View>
      </View>
    </View>
  )
}

export default Products