import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {AuthNavigator } from './Navigator/Navigator'
import Navigator from './Navigator/Navigator'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { Provider,useDispatch, useSelector } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font'
import productReducer from './store/reducer/products'
import cartReducer from './store/reducer/cart'
import orderReducer from './store/reducer/order'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userActions from './store/action/user'
import userReducer from './store/reducer/user'
import { NavigationContainer } from '@react-navigation/native';
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  user:userReducer,
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken=async()=>{
      dispatch(userActions.setUser(await AsyncStorage.getItem('userData')))
    }
    getToken();
   
  
  }, []);
  const user = useSelector(state=>state.user.user)

  if(user){
    return(  
      <Navigator/>
      ) 
  }else{
    return(
        <AuthNavigator/> 
    )
  }
  // Works!
}
export default function AppWrapper() {

  let [fontsLoaded] = useFonts({
    'oswald': require('./assets/fonts/Oswald-Regular.ttf'),
    'firacode': require('./assets/fonts/FiraCode-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (

      <Provider store={store}>
        <App/>
      </Provider>

    )
  }

}

const styles = StyleSheet.create({

})
