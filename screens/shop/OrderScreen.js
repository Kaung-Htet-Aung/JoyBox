import React from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shop/orderItem';
const OrderScreen =(props)=>{
    const orders =useSelector(state=>state.order.order);
    
    return(
        
            <FlatList
               data={orders}
               keyExtractor={item=>item.id}
               renderItem={(itemData)=><OrderItem
                  amount={itemData.item.totalAmount}
                  date={itemData.item.readableDate}
                  items={itemData.item.item}
                  info={itemData.item.info}
               />}
            />
   
    )
}

export default OrderScreen;