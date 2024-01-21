import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Button, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/shop/productItem'
import * as productActions from '../store/action/product'
import * as orderActions from '../store/action/order'
import Colors from '../constants/color';
import OrderItem from '../components/shop/orderItem';
import order from '../store/reducer/order';
import { storage } from '../config/firebase';
const OrderScreen = (props) => {
    const orders = useSelector(state => state.order.order)
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false)
    const loadedOrders = useCallback(async () => {
        setisRefreshing(true)
        await dispatch(orderActions.fetchOrder());
        setisRefreshing(false)
    }, [dispatch, setisLoading]);

    useEffect(() => {
        props.navigation.addListener('focus', loadedOrders)
        return () => {
            props.navigation.removeListener()
        }
    }, [loadedOrders])

    useEffect(() => {
        setisLoading(true);
        loadedOrders().then(() => {
            setisLoading(false)
        })
    }, [loadedOrders, dispatch])

    if (isLoading) {
        return (
            <View style={styles.indicatorAndNoproduct}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }
    if (!isLoading && orders.length === 0) {
        return (
            <View style={styles.indicatorAndNoproduct}>
                <Text>No Orders found</Text>
            </View>
        )
    }
    const deleteImage = (url) => {
        if (url ==="") {
           return ;
        }else{
            let ref = storage.ref().child(`image/${url}`);
            ref.delete().then(() => {
                console.log('deleted')
            })
        }
    }

    return (

        <FlatList
            onRefresh={loadedOrders}
            refreshing={isRefreshing}
            data={orders}
            keyExtractor={item => item.id}
            renderItem={(itemData) => <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.date}
                items={itemData.item.item}
                info={itemData.item.orderInfo}
                onDelete={() => {
                    Alert.alert('Are you sure?', 'Do you really want to delere this item', [
                        {
                            text: "No",
                            style: "cancel",
                        },
                        {
                            text: "Yes",
                            style: 'destructive',
                            onPress: () => {
                                dispatch(orderActions.deleteOrder(itemData.item.id))
                                deleteImage(itemData.item.orderInfo.map(info => {
                                    return info.filename
                                }))

                            }
                        },

                    ])
                }}
            />}
        />



    )
}


const styles = StyleSheet.create({
    indicatorAndNoproduct: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default OrderScreen