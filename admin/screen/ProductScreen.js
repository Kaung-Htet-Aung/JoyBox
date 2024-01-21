import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Button, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/shop/productItem'
import * as productActions from '../store/action/product'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../constants/color';
import { storage } from '../config/firebase';
const ProductScreen = (props) => {
    const products = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false)
    const [isRefreshing, setisRefreshing] = useState(false)
    const loadProducts = useCallback(async () => {
        setisRefreshing(true);
        await dispatch(productActions.fetchProduct());
        setisRefreshing(false)
    }, [dispatch, setisLoading]);

    useEffect(() => {
        props.navigation.addListener('focus', loadProducts)
        return () => {
            props.navigation.removeListener()
        }
    }, [loadProducts])

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
                <Button title="Add New Product" onPress={() => {
                    props.navigation.navigate('EditProduct',
                        {
                            productId: 0
                        }
                    )
                }} />
            </View>
        )
    }
    const deleteImage = (url) => {
        let ref = storage.refFromURL(url);
        ref.delete().then(() => {
            console.log('deleted')
        })
    }
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            ListHeaderComponent={<Button title="Add New Product" onPress={() => {
                props.navigation.navigate('EditProduct',
                    {
                        productId: 0
                    }
                )
            }} />}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imgUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onEdit={() => {
                        props.navigation.navigate('EditProduct',
                            {
                                productId: itemData.item.id
                            }
                        )
                    }}
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

                                    dispatch(productActions.deleteProduct(itemData.item.id))

                                    deleteImage(itemData.item.imgUrl)

                                }
                            },

                        ])
                    }}
                />
            }
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

export default ProductScreen