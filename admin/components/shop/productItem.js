
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
    <View style={styles.itemContainer}>
      <TouchableCom style={styles.screen} onPress={()=>{

      }}>
        
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: props.image }}
            />
          </View>
          <View style={styles.titlePriceContainer}>
            <Text style={styles.titlePrice}>{props.title}</Text>
            <Text style={styles.titlePrice}>{props.price}ks</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableCom onPress={props.onEdit}>
              <Text style={styles.btn}>Edit</Text>
            </TouchableCom>
            <TouchableCom onPress={props.onDelete}>
              <Text style={styles.btnDel}>Delete</Text>
            </TouchableCom>
          </View>

        </View>

      </TouchableCom>
    </View >
  );
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
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
    height: 220,
    paddingTop: 3,

  },
  titlePriceContainer:{
   alignItems:'center',
   paddingTop:10,
  },
  itemContainer: {
    alignItems: 'center'
  },
  image: {
    width: '98%',
    height: '100%',
  },
  item: {
    width: '90%',
    borderColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop:10,
    margin: 10,
  },

  titlePrice: {
    fontFamily: 'firacode',
    color: Colors.primary,
    marginHorizontal: 7,
    fontSize:15,
   
  },
  btn:{
    width:60,
    height:50,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    color:Colors.whiteColor,
    margin:10,
    marginTop:0,
    textAlign:'center',
    lineHeight:50,
    fontFamily:'firacode'
  },
  btnDel:{
    width:60,
    height:50,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor:'red',
    color:Colors.whiteColor,
    margin:10,
    marginTop:0,
    textAlign:'center',
    lineHeight:50,
    fontFamily:'firacode'
  }
});

export default ProductItem;