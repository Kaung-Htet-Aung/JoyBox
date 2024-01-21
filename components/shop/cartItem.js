import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/color'

const cartItem = (props) => {
    const products = useSelector(state => state.products.avaiableProducts)
    let prod = products.find(prod => prod.title == props.title);
    let description = prod.description;
    let descriptionType = (typeof (description))
    let index;
    if (props.size === "Large") {
        index = 0
    } else if (props.size === "Medium") {
        index = 1
    } else {
        index = 2
    }

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.title}>({props.quantity})</Text>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.quantity}>- {props.sum} ks</Text>

            </View>
            <View style={styles.itemData}>
                {props.deleteAble && (
                    <TouchableOpacity onPress={props.onRemove} style={styles.deleteBtn}>
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                            size={22}
                            color="red"
                            onPress={props.onRemove}
                        />
                    </TouchableOpacity>
                )}


            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    cartItem: {
        marginHorizontal: 30,
        marginTop: 20,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 2, height: 10 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.whiteColor,
        marginBottom: 10,
    },
    deleteBtn: {
        marginLeft: 10
    },
    itemData: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    quantity: {
        fontFamily: 'firacode',
        color: 'red'
    },
    title: {
        fontFamily: 'firacode',
        color: 'green',
        fontWeight: 'bold',

    },
    amount: {
        color: 'red'
    }
})

export default cartItem;