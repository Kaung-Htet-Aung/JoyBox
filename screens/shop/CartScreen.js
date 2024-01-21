import React from 'react';
import {View,Text,FlatList,Button,StyleSheet,Image} from 'react-native';;
import Colors from '../../constants/color';
import CartItem from '../../components/shop/cartItem';
import { useSelector,useDispatch} from 'react-redux';
import * as cartActions from '../../store/action/cart'
import * as orderActions from '../../store/action/order'
import OrderInforamtion from './OrderInformation';
const CartScreen=({navigation})=>{
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch=useDispatch();
    const cartItem =useSelector(state=>{
        let transformedCartItem =[];
        for (const key in state.cart.item){
            transformedCartItem.push({
                productId:key,     
                quantity:state.cart.item[key].quantity,           
                productPrice:state.cart.item[key].productPrice,
                productTitle:state.cart.item[key].productTitle,             
                sum:state.cart.item[key].sum,
            })
          
        }
        return transformedCartItem.sort((a,b)=>a.productId>b.productId? 1:-1);
        
    })
    
    return(
        <View style={styles.screen}>          
            <View style={styles.summary}>
                 <Text style={styles.summaryText}>
                     <Text style={styles.amount}>{cartTotalAmount}KS</Text>
                 </Text>
                 <Button title="To Order"
                    disabled={cartItem.length===0}
                    onPress={()=>{
                       navigation.navigate('OrderInformation',
                       {
                           item:cartItem
                       })   
                    }}
                 />
            </View>
            <FlatList 
              data={cartItem}
              keyExtractor={item=>item.productId}
              renderItem={itemData=><CartItem 
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                sum={itemData.item.sum}
                deleteAble
                onRemove={()=>{
                   dispatch(cartActions.removeFromCart(itemData.item.productId))
                }}
              />
            }
            />
        </View>
    )
}
 CartScreen.options=(navData)=>{

        return{
            headerLeft: () => (
              <Ionicons name="arrow-back" size={30} color="#7760d4" onPress={() => { navigation.navigate("Products")}} />
            )}
        }
 
const styles=StyleSheet.create({
   scren:{
       margin:20,
   },
   summary:{
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center',
       margin:20,
       padding:10,
       backgroundColor:Colors.primary,
       shadowColor:'black',
       shadowOpacity:0.26,
       shadowOffset:{width:0,height:2},
       shadowRadius:8,
       elevation:5,
       borderRadius:10,
      
   },
   summaryText:{
      fontFamily:'oswald',
      fontSize:20,
   },
   amount:{
       color:Colors.whiteColor
   }
})
export default CartScreen;