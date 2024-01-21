
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/color'
import { FontAwesome5 } from '@expo/vector-icons';

const ProductItem = (props) => {
  let TouchableCom = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCom = TouchableNativeFeedback;
  }
  return (
    <TouchableCom style={styles.screen} onPress={props.onViewDetail}>
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: props.image }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.price}>{props.price}Ks(M)</Text>
          <FontAwesome5 
             name="shopping-cart" 
             size={20} 
             color={Colors.primary} 
             style={styles.cartIcon} 
             onPress={props.onAddToCart}
          />
        </View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableCom>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: '50%',
    fontFamily: 'oswald-bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 7,

  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    height: 180,
    paddingTop: 30,
    
    
  },
  image: {
    width: '90%',
    height: '90%',
  },
  item: {
    width:'45%',
    borderColor: 'white',
    borderLeftWidth: 9,
    borderRightWidth: 9,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
        

  },
  price: {
    paddingTop: 2,
    fontFamily: 'oswald',
    color: Colors.primary,
  },
  title: {
   fontFamily:'firacode',
   color:Colors.primary,
   marginHorizontal:7 ,
   
  },

  cartIcon: {
    paddingTop: 3,
    width:20,
   
  }
});

export default ProductItem;