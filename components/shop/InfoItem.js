import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Colors from '../../constants/color'

const orderInfo = (props) => {
    
    return (
        <View>
            <View style={styles.orderItem}>
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>Name:</Text>
                    <Text style={styles.textDetail}>{props.name}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>Phone Number:</Text>
                    <Text style={styles.textDetail}>{props.phoneNumber}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.text}>Size:</Text>
                    <Text style={styles.textDetail}>{props.size}</Text>
                </View>

            </View>
            <View style={styles.addressContainer}>
                <Text style={styles.text}>Address:</Text>
                <Text style={styles.addressAndDes}>{props.address}</Text>
            </View>
            
            {props.description!=="" && (
                <View style={styles.addressContainer}>
                    <Text style={styles.text}>description:</Text>
                    <Text style={styles.addressAndDes}>{props.description}</Text>
                </View>

            )}
            {props.image!=="" && (
                <View style={styles.addressContainer}>
                    <Text style={styles.text}>Image:</Text>
                    <Image source={{uri:props.image}} style={{width:200,height:150}}/>
                </View>
                
            )}

        </View>
    )
}
const styles = StyleSheet.create({
    orderItem: {
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        paddingTop: 7,
    },
    text: {
        fontFamily: 'firacode',
        fontSize: 14,
        color: Colors.primary
    },
    textDetail: {
        fontFamily: 'firacode',
        fontSize: 14,
    },
    addressContainer: {
        marginLeft: '5%',
        paddingTop: 10,
    },
    addressAndDes: {
        fontSize: 13,
        fontFamily: 'firacode',
        marginTop: 5,
    }
})

export default orderInfo;