import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartQuantity, selectUser } from '../../../Redux/Reducer/Reducer'
import URL from '../../../UrlApi'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateCartQuantity } from '../../../Redux/Reducer/Reducer'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Icon } from '@rneui/themed'
const Cart = ({ navigation }) => {

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  const getProducts = async () => {
    setIsLoading(true)
    await axios({
      method: 'get',
      url: `${URL}products/carts?user_id=` + user._id,
    })
      .then((res) => {
        if (res.status === 200) {
          setProductList(res.data);
          dispatch(updateCartQuantity(res.data.length));
          getTotalPrice(res.data);
        }
        else if (res.status === 201) {
          setProductList([]);
          dispatch(updateCartQuantity(0));
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getTotalPrice = (data) => {
    let mTotalPrice = 0;
    data.forEach(element => {
      mTotalPrice += element.price * element.quantity;
    });
    setTotalPrice(mTotalPrice)
  }

  const handleDelete = ({ item }) => {
    setIsLoading(true)
    axios({
      method: 'delete',
      url: `${URL}products/carts/item`,
      data: {
        _id: item._id,
      }
    }).then((res) => {
      if (res.status == 200) {
        getProducts()
      }
    })
  }

  const handleAdd = ({ item }) => {
    setIsLoading(true)
    axios({
      method: 'post',
      url: `${URL}products/carts`,
      data: {
        product_id: item.product_id._id,
        user_id: user._id,
        quantity: 1,
        price: item.product_id.price,
        color: item.color,
        size: item.size
      }
    }).then((res) => {
      if (res.status == 200) {
        getProducts()
      }
    })
  }

  const handleRemove = ({ item }) => {
    setIsLoading(true);
    axios({
      method: 'put',
      url: `${URL}products/carts?_id=` + item._id,
      data: {
        _id: item._id,
        quantity: item.quantity,
      }
    }).then((res) => {
      if (res.status == 200) {
        getProducts()
      }
    })
  }

  React.useEffect(() => {
    const tabPress = navigation.addListener('tabPress', (e) => {
      getProducts();
    });
    getProducts();
    return tabPress;
  }, [isLoading]);

  return (
    <View>
      <View style={styles.container}>
        <Text
          style={{
            color: '#EFE3C8',
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10
          }}
        >
          Giỏ hàng
        </Text>
        {productList.length === 0 ? (<Text style={{
          color: '#EFE3C8',
          fontSize: 20,
          textAlign: 'center',
          marginTop: '50%'
        }}>
          Không có sản phẩm trong giỏ hàng!
        </Text>) : (
          <View style={{ width: '100%', height: '95%' }}>
            <View style={{
              height: '85%',
            }}>
              <SwipeListView
                data={productList}
                keyExtractor={(item) => item._id}
                key={(item) => item._id}
                horizontal={false}
                leftOpenValue={75}
                rightOpenValue={-170}
                stopLeftSwipe={94}
                stopRightSwipe={-200}
                renderHiddenItem={({ item }) => (
                  <View style={{
                    width: '100%',
                    height: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <TouchableOpacity style={{
                      backgroundColor: '#C94C4C',
                      width: 65,
                      height: '100%',
                      borderRadius: 10,
                      justifyContent: 'center'
                    }}
                      onPress={() => handleDelete({ item })}
                    >
                      <Icon name='delete' type='antdesign' size={30} color={'white'} />
                    </TouchableOpacity>
                    <View style={{
                      width: 160,
                      height: '100%',
                      backgroundColor: '#362C36',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row'
                    }}>
                      <TouchableOpacity style={{
                        width: 35,
                        height: 35,
                        backgroundColor: '#EFE3C8',
                        borderRadius: 10,
                        justifyContent: 'center'
                      }}
                        onPress={() => handleRemove({ item })}
                      >
                        <Icon name='minus' type='antdesign' size={30} color={'#362C36'} />
                      </TouchableOpacity>
                      <Text style={{
                        width: 50,
                        height: 35,
                        backgroundColor: '#201520',
                        color: '#EFE3C8',
                        fontSize: 23,
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        textAlign: 'center'
                      }}>{item.quantity}</Text>
                      <TouchableOpacity style={{
                        width: 35,
                        height: 35,
                        backgroundColor: '#EFE3C8',
                        borderRadius: 10,
                        justifyContent: 'center'
                      }}
                        onPress={() => handleAdd({ item })}
                      >
                        <Icon name='plus' type='antdesign' size={30} color={'#362C36'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                renderItem={({ item }) =>
                  <View item={item} style={{
                    backgroundColor: '#362C36',
                    flexDirection: 'row',
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10
                  }}>
                    <View style={{
                      width: 70,
                      height: 70,
                      borderRadius: 10,
                      overflow: 'hidden',
                      marginRight: 10
                    }}>
                      <Image
                        source={{ uri: item.product_id.image }}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                    <View style={{ width: '75%' }}>
                      <Text style={{
                        height: 26,
                        color: '#EFE3C8',
                        fontSize: 20,
                        fontWeight: 'bold'
                      }}>
                        {item.product_id.name}
                      </Text>
                      <View style={{
                        flexDirection: 'row',
                      }}>
                        <Text style={{
                          color: '#EFE3C8',
                          fontSize: 17,
                        }}>
                          Màu:{' '}
                          <Text style={{ fontWeight: 'bold' }}>
                            {item.color}
                          </Text>
                          {' '}- Size:{' '}
                          <Text style={{ fontWeight: 'bold' }}>
                            {item.size}
                          </Text>
                        </Text>
                        <Text style={{
                          position: 'absolute',
                          color: '#EFE3C8',
                          fontSize: 17,
                          right: 10
                        }}>
                          x{item.quantity}
                        </Text>
                      </View>
                      <Text style={{
                        color: '#EFE3C8',
                        fontSize: 18,
                        fontWeight: 'bold'
                      }}>
                        {(item.price * item.quantity).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ
                      </Text>
                    </View>
                  </View>
                }
              />
            </View>
            <View style={{
              width: '100%',
              padding: 5,
              paddingHorizontal: 20,
              backgroundColor: '#38232A',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              position: 'absolute',
              bottom: 10,
            }}>

              <View style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View>
                  <Text style={{
                    color: '#EFE3C8',
                    fontSize: 15
                  }}>
                    Tổng thanh toán:
                  </Text>
                  <Text style={{
                    color: '#EFE3C8',
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}>
                    {totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ
                  </Text>
                </View>
                <TouchableOpacity style={{
                  backgroundColor: '#EFE3C8',
                  borderRadius: 10,
                  marginTop: 5
                }}
                  onPress={() => navigation.navigate('Payment', {
                    productList: productList,
                    price: totalPrice,
                  })}
                >
                  <Text style={{
                    color: '#362C36',
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 15
                  }}>
                    Thanh toán ({productList.length})
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
export default Cart

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    paddingTop: 35,
    backgroundColor: '#201520'
  }
})