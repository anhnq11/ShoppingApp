import { View, Text, Image, FlatList, TextInput } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Style from './ProductsStyle'

import URL from '../../../UrlApi';
import ProductItem from '../../../Comps/ProductItem/ProductItem';
import { selectUser } from '../../../Redux/Reducer/Reducer';

const Products = ({ navigation }) => {

  const user = useSelector(selectUser);

  const [productList, setproductList] = useState([]);
  const [queryText, setQueryText] = useState(null);
  const [queryData, setQueryData] = useState([])

  const getProducts = () => {
    let mUrl = URL + 'products/products';
    fetch(mUrl)
      .then(response => response.json())
      .then(json => {
        if (json) {
          setproductList(json);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleSearch = (text) => {
    const formattedText =  text.toLowerCase();
    const rs = productList.filter((item) => (item.name).toLowerCase().includes(formattedText));
    setQueryData(rs)
  }

  React.useEffect(() => {
    getProducts();
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
            }} 
            />
          </View>
          <View>
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
          </View>
        </View>
      </View>
    </View>
  )
}

export default Products