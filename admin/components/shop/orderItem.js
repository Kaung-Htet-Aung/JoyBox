import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Colors from '../../constants/color'
import CartItem from '../../components/shop/cartItem'
import InfoItem from '../../components/shop/InfoItem'
const OrderItem = (props) => {
    const [showDetail, setShowDetail] = useState(false)
    return (
        <View style={styles.screen}>
            <View style={styles.orderItem}>
                <View style={styles.summary}>
                    <Text style={styles.amount}>{props.amount}ks</Text>
                    <Text style={styles.date}>{props.date}</Text>
                    <TouchableOpacity onPress={props.onDelete}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <Button title={showDetail? "Hide Details":"Show Details"} color={Colors.primary}
                        onPress={() => {
                            //setShowDetail(true)
                            setShowDetail(prevState => !prevState)
                        }}

                    />                  
                     {showDetail &&
                        <View style={styles.detailItem}>
                            {props.items.map(cartItem => (
                                <CartItem
                                    key={cartItem.id}
                                    quantity={cartItem.quantity}
                                    title={cartItem.productTitle}
                                    amount={cartItem.sum}
                                />                              
                                
                            ))}
                            {props.info.map(info => (
                                <InfoItem
                                    key={info.name}
                                    name={info.name}
                                    phoneNumber={info.phoneNumber}
                                    size={info.size}
                                    address={info.address}
                                    description={info.description}
                                    image={info.imgUrl}
                                    surphoneNumber={info.surphoneNumber}
                                    
                                />                              
                                
                            ))}
                            
                        </View>

                    }
                </View>
            </View>
           
        </View>
    )
}
const styles = StyleSheet.create({
 
    orderItem: {
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
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    btnContainer: {
        paddingTop: 24,
       alignItems:'center'
    },
    detailItem:{
        width:'100%',
        paddingBottom:20,
    }
})
export default OrderItem;