import React from 'react';
import { Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import OrderScreen from '../screen/OrderScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/color'
import ProductScreen from '../screen/ProductScreen'
import EditProductScreen from '../screen/EditProductScreen';
const Stack = createStackNavigator();
const OrderStack = createStackNavigator()
const Drawer = createDrawerNavigator();

const Navigator = ({ navigation, route }) => {
  return (

    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.whiteColor,

      }
    }
    }>
      <Stack.Screen name="Products"
        component={ProductScreen}
        options={{
          headerLeft: () => (
            <Ionicons name="menu" size={30} color={Colors.primary} onPress={() => { navigation.toggleDrawer() }} />
          ),
          headerTitleAlign: 'center',

          headerTitle: () => (
            <Image
              style={{ height: 40 }}
              source={require('../Image/logo2.png')} />
          )
        }}
      />
      <Stack.Screen name="EditProduct"
        component={EditProductScreen}
        options={({ route }) => ({
        
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              style={{ height: 40 }}
              source={require('../Image/logo2.png')} />
          ),
          headerRight: () => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
              size={24}
              onPress={route.params.submit}

            />
          )
        })}
      />
    </Stack.Navigator>


  )
}

const OrderNavigator = ({navigation}) => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerLeft: () => (
            <Ionicons name="menu" size={30} color={Colors.primary} onPress={() => { navigation.toggleDrawer() }} />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              style={{ height: 40 }}
              source={require('../Image/logo2.png')} />
          ),

        }}
      >

      </OrderStack.Screen>
    </OrderStack.Navigator>
  )
}
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Products" component={Navigator}
          options={{
            drawerIcon: () => (
              <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={26} color={Colors.primary} />
            )
          }} />
        <Drawer.Screen name="Orders" component={OrderNavigator}
          options={{
            drawerIcon: () => (
              <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={26} color={Colors.primary} />
            )
          }} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
export default MainNavigator;