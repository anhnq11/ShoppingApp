import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'

import img1 from '../../../assets/png/feature1.jpg'
import img2 from '../../../assets/png/feature2.jpg'
import img3 from '../../../assets/png/feature3.jpg'

const SwiperComp = () => {
  const m_data = [img1, img2, img3];
  return (
    <Swiper
        autoplay
        height={40}
        showsPagination={false}
        autoplayTimeout={10}>
        {m_data.map((item, index) => {
          return (
            <View key={index} style={{
              width: '100%',
              height: 200,
              borderRadius: 30,
              overflow: 'hidden',
            }}>
              <Image
                source={item}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover', 
                }}
              />
            </View>
          );
        })}
      </Swiper>
  )
}

export default SwiperComp

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})