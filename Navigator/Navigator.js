import React, { useState } from 'react';
import { Image, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { Entypo, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../constants/color'
import PoverviewScreen from '../screens/shop/ProductOverviewScreen'
import PdetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import OrderInformationScreen from '../screens/shop/OrderInformation';
import { CustomSidebarMenu } from '../components/navigation/CustomSidebarMenu';
import Login from '../screens/authentication/Auth';
import SignUp from '../screens/authentication/SignUp'
import ForgotPassword from '../screens/authentication/ForgotPassword'
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const OrderScreenStack = createStackNavigator();
const AuthScreenStack = createStackNavigator()
const AboutScreenStack = createStackNavigator()
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGNUP } from '../store/action/auth';
import AboutScreen from '../screens/shop/About';
const poverViewNavigator = ({ navigation }) => {
  const [user, setuser] = useState();
  AsyncStorage.getItem('userData').then(res => {
    setuser(res)
  })
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.whiteColor,

      }
    }
    }>
      <Stack.Screen name="Products"
        component={PoverviewScreen}
        options={{
          headerLeft: () => (
            <Ionicons name="menu" size={30} color={Colors.primary} onPress={() => { navigation.toggleDrawer() }} />
          )
          ,
          headerRight: () => (
            <FontAwesome5
              name="shopping-cart"
              size={26}
              color={Colors.primary}
              onPress={() => {
                { navigation.navigate('Cart') }
              }}
            />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              style={{ height: 40 }}
              source={require('../Image/logo2.png')} />
          )
        }}
      />

      <Stack.Screen name="ProductDetail"
        component={PdetailScreen}
        options={{
          headerRight: () => (
            <FontAwesome5
              name="shopping-cart"
              size={26}
              color={Colors.primary}
              onPress={() => {
                { navigation.navigate('Cart') }
              }}
            />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              style={{ height: 40 }}
              source={require('../Image/logo2.png')} />
          )
        }}
      />

      <Stack.Screen name="Cart"
        component={CartScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              style={{ height: 40 }}
              source={require('../Image/logo2.png')} />
          )
        }}
      />

      <Stack.Screen name="OrderInformation"
        component={OrderInformationScreen}
        options={{
          headerRight: () => (
            <FontAwesome5
              name="shopping-cart"
              size={26}
              color={Colors.primary}
              onPress={() => {
                { navigation.navigate('Cart') }
              }}
            />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              style={{ height: 40 }}
              source={require('../Image/logo2.png')} />
          )
        }}
      />
      <Stack.Screen name="About"
        component={AboutScreen}
        options={{

          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              style={{ height: 40 }}
              source={require('../Image/logo2.png')} />
          )
        }}
      />
    </Stack.Navigator>
  )
}
export const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <AuthScreenStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthScreenStack.Screen name="Login" component={Login} />
        <AuthScreenStack.Screen name="SignUp" component={SignUp} />
        <AuthScreenStack.Screen name="Forgot" component={ForgotPassword} />
      </AuthScreenStack.Navigator>
    </NavigationContainer>
  )
}
const orderScreenNavigator = ({ navigation }) => {
  return (
    <OrderScreenStack.Navigator>
      <OrderScreenStack.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          headerLeft: () => (
            <Ionicons name="menu" size={30} color={Colors.primary} onPress={() => { navigation.toggleDrawer() }} />
          )
          ,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              style={{ height: 40 }}
              source={require('../Image/logo2.png')} />
          )
        }}
      />


    </OrderScreenStack.Navigator>
  )
}
const AboutNavigator = () => {
  return (
    
      <AboutScreenStack.Navigator>
        <AboutScreenStack.Screen
          name="About" component={AboutScreen}
          options={{
            headerLeft: () => (
              <Ionicons name="menu" size={30} color={Colors.primary} onPress={() => { navigation.toggleDrawer() }} />
            )
            ,
            headerTitleAlign: 'center',
            headerTitle: () => (
              <Image
                style={{ height: 40 }}
                source={require('../Image/logo2.png')} />
            )
          }} />
      </AboutScreenStack.Navigator>
    
  )
}
const Navigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: '#FFFFFF',
        }}
        drawerContentOptions={{
          activeTintColor: Colors.primary,
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />
        }>

        <Drawer.Screen
          name="Products"
          component={poverViewNavigator}
          options={{
            drawerIcon: () => (
              <FontAwesome5 name="product-hunt" size={24} color="black" color={Colors.primary} />
            )
          }}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <MaterialIcons name="shopping-cart" size={24} color="black" color={Colors.primary} />
            )
          }}
          name="Your Orders"
          component={orderScreenNavigator}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <Entypo name="info-with-circle" size={26} color={Colors.primary} />
            )
          }}
          name="About Us"
          component={AboutNavigator}
        />

      </Drawer.Navigator>
    </NavigationContainer>

  );
}
export default Navigator;