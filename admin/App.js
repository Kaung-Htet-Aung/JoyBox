import React, { useState,useEffect} from 'react';
import { StyleSheet,ActivityIndicator } from 'react-native';
import { createStore, combineReducers,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font'
import productReducer from './store/reducer/products'
import MainNavigator from './Navigator/Navigator';
import orderReducer from './store/reducer/order'
const rootReducer = combineReducers({
  products: productReducer,
  order:orderReducer
})
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {

  let [fontsLoaded] = useFonts({
    'oswald': require('./assets/fonts/Oswald-Regular.ttf'),
    'firacode': require('./assets/fonts/FiraCode-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store} style={styles.screen}>
        <MainNavigator/>
      </Provider>

    )
  }


}

const styles = StyleSheet.create({
   screen:{
     backgroundColor:"white",
     height:'100%'
   }
})
