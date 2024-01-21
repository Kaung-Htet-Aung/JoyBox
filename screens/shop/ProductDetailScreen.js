
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Platform, Button, ScrollView, TouchableNativeFeedback } from 'react-native';
import Colors from '../../constants/color'
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/action/cart';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import cartItem from '../../components/shop/cartItem';
const pdetailScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const { item } = route.params;
  const selectedProduct = useSelector(state => state.products.avaiableProducts.find(prod => prod.id === productId));
  const description = selectedProduct.description;
  let descriptionType = (typeof (description))
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.imgContainer}>
        <View style={styles.imgSubContainer}>
          <Image source={{ uri: selectedProduct.imgUrl }}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.priceSizeContainer}>
        <View style={styles.summary}>
          <Text style={styles.price}>{selectedProduct.price}ks</Text>
          <Text style={styles.title}>{selectedProduct.title}</Text>
          <Text style={styles.size}>Medium Size</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.sizeDetail}>
          <View style={styles.sizeContainer}>
            <MaterialIcons name="menu-book" size={24} color="black" />
            <Text style={styles.detailSize}>Size</Text>
          </View>
        </View>
        <View style={styles.priceDetail}>
          <View style={styles.priceContainer}>
            <Feather name="dollar-sign" size={24} color="black" />
            <Text style={styles.detailPrice}>Price</Text>
          </View>
        </View>

      </View>
    
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => {
          dispatch(cartActions.addToCart(item));
          alert("Successfully added to the cart ✅")
        }}>
          <Text style={styles.btnText}>Add To Cart</Text>
        </TouchableOpacity>
        <FontAwesome5 style={styles.btnCart} name="shopping-cart" size={25} onPress={() => {
          navigation.navigate("Cart")
        }} />
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.whiteColor
  },
  imgContainer: {
    width: '100%',
    alignItems: 'center'
  },
  imgSubContainer: {
    width: '95%',
    height: 300,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 5, height: 10 },
    shadowRadius: 8,
    elevation: 9,
    borderRadius: 10,
    backgroundColor: 'white',

  },
  image: {
    width: '100%',
    height: '100%',

  },
  nothingText: {
    fontFamily: 'firacode',
    paddingTop: 30,

  },
  nothing: {
    alignItems: 'center',
    height: 10,

    lineHeight: 50,
  },
  priceSizeContainer: {
    width: '100%',
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: 10,
    height: 70,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,

  },
  price: {
    fontFamily: 'firacode',
    lineHeight: 70,
  },
  title: {
    fontFamily: 'oswald',
    lineHeight: 50,
    color: Colors.primary,
    fontWeight: 'bold'
  },
  size: {
    fontFamily: 'oswald',
    lineHeight: 70,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    marginTop: 30,
  },
  sizeContainer: {
    flexDirection: 'row',

  },
  priceContainer: {
    flexDirection: 'row'
  },
  sizeDetail: {
    borderRightWidth: 1,
    borderRightColor: 'black',
    width: '36%',
    height: 40,
    lineHeight: 70
  },
  detailLists: {
    height: 100,
    width: '100%',
    alignItems: 'center'
  },
  detailList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%'
  },
  btn: {
    width: 140,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: 10
  },
  btnCart: {
    width: 140,
    alignItems: 'center',
    textAlign: 'center',
    color: Colors.whiteColor,
    backgroundColor: 'green',
    borderWidth: 1,
    paddingTop: 10,
    borderColor: Colors.primary,
    marginHorizontal: 10,

  },
  btnOrderText: {
    color: Colors.whiteColor,
    lineHeight: 30
  },
  btnText: {
    lineHeight: 50,
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 100,
    marginBottom: 20,
  }


});

export default pdetailScreen;