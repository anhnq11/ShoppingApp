import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Icon, withBadge } from '@rneui/themed';
import tw from 'twrnc';
import { useSelector } from 'react-redux';
import { selectCartQuantity, selectUser } from '../../Redux/Reducer/Reducer';
import URL from '../../UrlApi';
import axios from 'axios';

const ProductDetails = ({ route, navigation }) => {

  const user = useSelector(selectUser);
  const cartQuantity = useSelector(selectCartQuantity)
  const BadgedIcon = withBadge(cartQuantity)(Icon);

  const [likePrd, setLikePrd] = useState(null);
  const [like_id, setLike_id] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { item } = route.params;

  const handleFavour = () => {
    axios({
      method: 'get',
      url: `${URL}products/favours/details?user_id=` + user._id + '&product_id=' + item._id,
    }).then((res) => {
      if (res.data) {
        setLikePrd(true);
        setLike_id(res.data._id);
      }
      else {
        setLikePrd(false)
      }
    });
  }

  const addToFavour = () => {
    axios({
      method: 'post',
      url: `${URL}products/favours`,
      data: {
        product_id: item._id,
        user_id: user._id,
      }
    }).then((res) => {
      if (res.data) {
        setLikePrd(true)
        setLike_id(res.data._id);
      }
      else {
        setLikePrd(false)
      }
    })
  }

  const removeToFavour = () => {
    axios({
      method: 'delete',
      url: `${URL}products/favours?_id=${like_id}`,
    }).then((res) => {
      if (res.data) {
        setLikePrd(false)
        setLike_id(null)
      }
      else {
        setLikePrd(true)
      }
    })
  }

  const addToCart = () => {
    if (!color && !size) {
      setSizeError(true)
      setColorError(true)
      return;
    }

    if (!color) {
      setColorError(true)
      return
    }

    if (!size) {
      setSizeError(true)
      return
    }

    axios({
      method: 'post',
      url: `${URL}products/carts`,
      data: {
        product_id: item._id,
        user_id: user._id,
        quantity: quantity,
        color: color,
        size: size,
        price: item.price
      }
    }).then((res) => {
      if (res.data) {
        console.log('Add to cart successfully!!');
      }
    })
  }


  React.useEffect(() => {
    handleFavour();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.prdImageBox}>
          <Image style={styles.imageBox} source={{ uri: item.image }} />
          <View style={{ position: 'absolute', width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8 }}>
            <TouchableOpacity style={styles.backgroundIconBack} onPress={() => navigation.navigate('Products')}>
              <Icon name='arrowleft' type='antdesign' size={30} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.backgroundIconBack} onPress={() => navigation.navigate('Cart')}>
              {
                typeof(cartQuantity) == 'number' && cartQuantity != 0 ? (
                  <BadgedIcon name='shoppingcart' type='antdesign' size={30} color={'white'} />
                ) : (
                  <Icon name='shoppingcart' type='antdesign' size={30} color={'white'} />
                )
              }
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingTop: 2, height: '45%' }}>
          <Text style={[styles.itemName, { marginTop: 5 }]} >{item.name}</Text>
          <Text style={[styles.itemName, { fontSize: 21 }]}>Giá bán: {item.price} VNĐ</Text>
          <Text style={{ color: 'white', fontSize: 18, marginTop: 5 }} >{item.desc}</Text>
          <View>
            {/* Select size */}
            <Text style={[styles.itemName, { fontSize: 21, marginTop: 10 }]}>Kích thước
              { !sizeError ? (<View></View>) : (
                <Text style={{ color: 'red', fontSize: 15, fontWeight: 'normal', marginBottom: 20 }}> *Chọn kích thước </Text>
              )}
            </Text>
            <View style={tw`mt-1 flex-row w-full`}>
              <TouchableOpacity onPress={() => {
                setSize('S')
                setSizeError(false)
              }}>
                {
                  size === 'S' ? (
                    <View style={[styles.sizeBox, { backgroundColor: 'green', borderColor: 'green' }]}>
                      <Text style={[styles.itemName, { fontSize: 18, textAlign: 'center' }]}>S</Text>
                    </View>
                  ) : (
                    <View style={styles.sizeBox}>
                      <Text style={[styles.itemName, { fontSize: 18, textAlign: 'center' }]}>S</Text>
                    </View>
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setSize('M')
                setSizeError(false)
              }}>
                {
                  size === 'M' ? (
                    <View style={[styles.sizeBox, { backgroundColor: 'green', borderColor: 'green' }]}>
                      <Text style={[styles.itemName, { fontSize: 18, textAlign: 'center' }]}>M</Text>
                    </View>
                  ) : (
                    <View style={styles.sizeBox}>
                      <Text style={[styles.itemName, { fontSize: 18, textAlign: 'center' }]}>M</Text>
                    </View>
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setSize('L')
                setSizeError(false)
              }}>
                {
                  size === 'L' ? (
                    <View style={[styles.sizeBox, { backgroundColor: 'green', borderColor: 'green' }]}>
                      <Text style={[styles.itemName, { fontSize: 18, textAlign: 'center' }]}>L</Text>
                    </View>
                  ) : (
                    <View style={styles.sizeBox}>
                      <Text style={[styles.itemName, { fontSize: 18, textAlign: 'center' }]}>L</Text>
                    </View>
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setSize('XL')
                setSizeError(false)
              }}>
                {
                  size === 'XL' ? (
                    <View style={[styles.sizeBox, { backgroundColor: 'green', borderColor: 'green' }]}>
                      <Text style={[styles.itemName, { fontSize: 18, textAlign: 'center' }]}>XL</Text>
                    </View>
                  ) : (
                    <View style={styles.sizeBox}>
                      <Text style={[styles.itemName, { fontSize: 18, textAlign: 'center' }]}>XL</Text>
                    </View>
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setSize('XXL')
                setSizeError(false)
              }}>
                {
                  size === 'XXL' ? (
                    <View style={[styles.sizeBox, { backgroundColor: 'green', borderColor: 'green' }]}>
                      <Text style={[styles.itemName, { fontSize: 18, textAlign: 'center' }]}>XXL</Text>
                    </View>
                  ) : (
                    <View style={styles.sizeBox}>
                      <Text style={[styles.itemName, { fontSize: 18, textAlign: 'center' }]}>XXL</Text>
                    </View>
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
          {/* Select color */}
          <View>
            <Text style={[styles.itemName, { fontSize: 21, marginTop: 10 }]}>Màu sắc
              { !colorError ? (<View></View>) : (
                <Text style={{ color: 'red', fontSize: 15, fontWeight: 'normal', marginBottom: 20 }}> *Chọn màu sắc </Text>
              )}
            </Text>
            <View style={tw`mt-1 flex-row w-full`}>
              <TouchableOpacity onPress={() => {
                setColor('white')
                setColorError(false)
              }}>
                {
                  color === 'white' ? (
                    <View style={[styles.colorBox, { backgroundColor: 'white', borderColor: 'green' }]}></View>
                  ) : (
                    <View style={[styles.colorBox, { backgroundColor: 'white' }]}></View>
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setColor('black')
                setColorError(false)
                }}>
                {
                  color === 'black' ? (
                    <View style={[styles.colorBox, { backgroundColor: 'black', borderColor: 'green' }]}></View>
                  ) : (
                    <View style={[styles.colorBox, { backgroundColor: 'black' }]}></View>
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setColor('grey')
                setColorError(false)
                }}>
                {
                  color === 'grey' ? (
                    <View style={[styles.colorBox, { backgroundColor: 'grey', borderColor: 'green' }]}></View>
                  ) : (
                    <View style={[styles.colorBox, { backgroundColor: 'grey' }]}></View>
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setColor('red')
                setColorError(false)
                }}>
                {
                  color === 'red' ? (
                    <View style={[styles.colorBox, { backgroundColor: 'red', borderColor: 'green' }]}></View>
                  ) : (
                    <View style={[styles.colorBox, { backgroundColor: 'red' }]}></View>
                  )
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setColor('blue')
                setColorError(false)
                }}>
                {
                  color === 'blue' ? (
                    <View style={[styles.colorBox, { backgroundColor: 'blue', borderColor: 'green' }]}></View>
                  ) : (
                    <View style={[styles.colorBox, { backgroundColor: 'blue' }]}></View>
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={tw`mt-3 flex-row`}>
              <Text style={[styles.itemName, { fontSize: 21, width: '40%' }]}>Số lượng</Text>
              <TouchableOpacity style={styles.btnQtyBox}>
                <Icon name='minus' type='antdesign' color={'#201520'} size={25} onPress={() => {
                  quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)
                }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, paddingHorizontal: 10, color: 'white', fontWeight: 'bold' }}>{quantity}</Text>
              <TouchableOpacity style={styles.btnQtyBox} onPress={() => { setQuantity(quantity + 1) }}>
                <Icon name='plus' type='antdesign' color={'#201520'} size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView >
      {/* Like - Add to cart */}
      <View>
        <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
          {
            likePrd === true ? (
              <TouchableOpacity
                style={[styles.btnBackground, { width: '20%', backgroundColor: 'green', borderColor: 'green' }]}
                onPress={() => {
                  removeToFavour();
                }}
              >
                <Icon name='heart' type='antdesign' size={30} color={'white'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.btnBackground, { width: '20%' }]} onPress={() => {
                addToFavour()
              }}>
                <Icon name='hearto' type='antdesign' size={30} color={'white'} />
              </TouchableOpacity>
            )
          }
          <TouchableOpacity style={[styles.btnBackground, { width: '78%' }]} onPress={addToCart}>
            <Icon name='shoppingcart' type='antdesign' size={30} color={'white'} />
            <Text style={[styles.itemName, { fontSize: 20, textAlign: 'center' }]}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#201520',
    width: '100%',
    height: '100%',
    padding: 10,
    paddingTop: 35
  },
  prdImageBox: {
    width: '100%',
    height: 400,
  },
  imageBox: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  backgroundIconBack: {
    backgroundColor: '#333',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    opacity: 0.7,
  },
  itemName: {
    width: '80%',
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
  sizeBox: {
    width: 50,
    height: 30,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 25,
    marginRight: 10,
  },
  btnQtyBox: {
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBackground: {
    height: 50,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }
})