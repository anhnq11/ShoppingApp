import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScr from './Home/Home';
import ProductsScr from './Products/Products';
import CartScr from './Cart/Cart';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Profile from './Profile/Profile';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScr}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#201520',
          tabBarIcon: ({focused}) => {
            let color;
            if (focused) {
              color = '#201520';
            }
            else{
              color = '#EFE3C8'
            }
            return (<FontAwesome name='home' style={{ fontSize: 32 }} color={color}/>)
          },
          tabBarActiveBackgroundColor: '#EFE3C8',
          tabBarInactiveBackgroundColor: '#201520'
        }}
      />
      <Tab.Screen name="Products" component={ProductsScr}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            let color;
            if (focused) {
              color = '#201520';
            }
            else{
              color = '#EFE3C8'
            }
            return (<FontAwesome name='th-list' style={{ fontSize: 30 }} color={color}/>)
          },
          tabBarActiveBackgroundColor: '#EFE3C8',
          tabBarInactiveBackgroundColor: '#201520'
        }}
      />
      <Tab.Screen name="Cart" component={CartScr}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#201520',
          tabBarIcon: ({focused}) => {
            let color;
            if (focused) {
              color = '#201520';
            }
            else{
              color = '#EFE3C8'
            }
            return (<FontAwesome name='shopping-cart' style={{ fontSize: 32 }} color={color}/>)
          },
          tabBarActiveBackgroundColor: '#EFE3C8',
          tabBarInactiveBackgroundColor: '#201520'
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#201520',
          tabBarIcon: ({focused}) => {
            let color;
            if (focused) {
              color = '#201520';
            }
            else{
              color = '#EFE3C8'
            }
            return (<FontAwesome name='user' style={{ fontSize: 30 }} color={color}/>)
          },
          tabBarActiveBackgroundColor: '#EFE3C8',
          tabBarInactiveBackgroundColor: '#201520'
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNav