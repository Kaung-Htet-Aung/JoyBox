import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';;
import Colors from '../../constants/color';

const AboutScreen=()=>{
     return(
         <View style={styles.screen}><Text>About Screen</Text></View>
     )
}

const styles =StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default AboutScreen;
