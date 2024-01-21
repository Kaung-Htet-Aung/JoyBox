
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Image, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/color'
import ProductItem from '../../components/shop/productItem';
import Header from '../../components/shop/header';
import * as cartActions from '../../store/action/cart';
import * as productActions from '../../store/action/product'
import { app } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PoverviewScreen = (props) => {
  const products = useSelector(state => state.products.avaiableProducts);
  const dispatch = useDispatch();
  const [isRefreshing, setisRefreshing] = useState(false)
  const [isLoading, setisLoading] = useState(false)

  const loadProducts = useCallback(async () => {
    setisRefreshing(true)
    await dispatch(productActions.fetchProduct());
    setisRefreshing(false)
  }, [dispatch, setisLoading])
  
  useEffect(() => {
    setisLoading(true);
    loadProducts().then(() => {
      setisLoading(false)
    })
  }, [loadProducts, dispatch])

  if (isLoading) {
    return (
      <View style={styles.indicatorAndNoproduct}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.indicatorAndNoproduct}>
        <Text>No products found</Text>
      </View>
    )
  }
  
  const user = app.auth().currentUser;

  if (user !== null) {
    id = user.id
  }

  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        ListHeaderComponent={<Header navigation={props.navigation}/>}
        columnWrapperStyle={styles.row}
        numColumns={2}
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData => <ProductItem
          image={itemData.item.imgUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail',
              {
                productId: itemData.item.id,
                item: itemData.item
              }
            )
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item))
            alert("Successfully added to the cart ✅")
          }}
        />}
      />
    </View>
  );
}
PoverviewScreen.options = (navData) => {

  return {
    headerLeft: () => (
      <Ionicons name="arrow-back" size={30} color="#7760d4" onPress={() => { navigation.navigate("Products") }} />
    )
  }
}


const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
  },
  indicatorAndNoproduct: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    justifyContent: "space-around",

  },

  search: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  textInput: {
    borderColor: Colors.primary,
    borderWidth: 1,
    width: 220,
    height: 40
  },
  imageContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    marginVertical: 30
  },
  image: {
    width: '96%',
    height: '100%'
  }
});

export default PoverviewScreen;