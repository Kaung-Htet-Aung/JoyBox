
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Linking } from 'react-native';

import Colors from '../../constants/color'
import { FontAwesome5, Entypo, MaterialIcons } from '@expo/vector-icons';

const Header = (props) => {
    return (
        <View style={styles.screen}>

            <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://apicms.thestar.com.my/uploads/images/2021/01/14/1007167.jpg', }}
                    style={styles.image}
                />
            </View>

            <View style={styles.contact}>
                <View style={styles.contactIcon}>
                    <Entypo name="facebook-with-circle"
                        size={30} color="blue"
                        onPress={()=>{
                            Linking.openURL('fb://page//%F0%9D%99%85%F0%9D%99%A4%F0%9D%99%AE-%F0%9D%98%BD%F0%9D%99%A4%F0%9D%99%AD-%F0%9D%99%8E%F0%9D%99%A3%F0%9D%99%96%F0%9D%99%98%F0%9D%99%A0-%F0%9D%99%81%F0%9D%99%A4%F0%9D%99%A4%F0%9D%99%99%F0%9D%99%A8-');
                        }}
                            
                    />

                            < FontAwesome5 name="phone-square" size={30} color="green" 
                     onPress={()=>{
                        Linking.openURL('tel:09258066990')
                    }}/>

                    <FontAwesome5 name="instagram" size={30} color="blue"  onPress={()=>{
                      alert("Not available now")
                    }}/>
                    <Entypo name="info-with-circle" size={30} color="black" onPress={()=>{
                       props.navigation.navigate('About')
                    }}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "white",
        paddingTop:7
    },
    textInput: {
        borderColor: Colors.primary,
        borderWidth: 1,
        width: '95%',
        height: 40
    },
    imageContainer: {
        width: '100%',
        height: 160,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        padding:2,
        
    },
    image: {
        width: '100%',
        height: '100%'
    },
    contact: {
        marginTop: 20,
    },
    contactIcon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }

});

export default Header;
