import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import Splash from './src/Screen/Splash/Splash';
import Route from './src/Screen/Route/Route';
import Login from './src/Screen/Login/Login';
import Regis from './src/Screen/Regis/Regis';
import MainScr from './src/Screen/Main/BottomTabNav';
import ProductDetail from './src/Screen/ProductDetails/ProductDetails';

import { store } from './src/Redux/Store/Store'
import AccountDetails from './src/Screen/Main/Profile/AccountDetails';
import Address from './src/Screen/Main/Profile/Address/Address';
import AddAddress from './src/Screen/Main/Profile/Address/AddAddress';
import AddressList from './src/Screen/Main/Profile/Address/AddressList';
import Checkout from './src/Screen/Main/Cart/Checkout';
import OrderTracking from './src/Screen/Main/Profile/OrderTracking';
import OrderDetails from './src/Screen/Main/Profile/OrderDetails';
import OrderHistory from './src/Screen/Main/Profile/OrderHistory';
import SelectAddress from './src/Screen/Main/Cart/SelectAddress';
import SelectPaymentMethods from './src/Screen/Main/Cart/SelectPaymentMethods';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Route" component={Route} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Regis" component={Regis} options={{ headerShown: false }} />
          <Stack.Screen name="MainScr" component={MainScr} options={{ headerShown: false }} />
          <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
          <Stack.Screen name="SelectAddress" component={SelectAddress} options={{ headerShown: false }} />
          <Stack.Screen name="SelectPaymentMethods" component={SelectPaymentMethods} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={ProductDetail} options={{ headerShown: false }} />
          <Stack.Screen name="AccountDetails" component={AccountDetails} options={{ headerShown: false }} />
          <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
          <Stack.Screen name="OrderTracking" component={OrderTracking} options={{ headerShown: false }} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />
          <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: false }} />
          <Stack.Screen name="AddressList" component={AddressList} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}