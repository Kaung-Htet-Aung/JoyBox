import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, } from "react-native";
import { app } from "../../config/firebase";
import color from "../../constants/color";

const ForgotPassword = (props) => {
    const [email, setemail] = useState('');
   
  
    const handleEmail = text => {
        setemail(text)
    };


    const forgotPassword=()=>{
       app.auth().sendPasswordResetEmail(email).then(()=>{
           alert("Password reset has been send.Check your mail!")
       },(error)=>{
           alert(error.message)
       })
    }
    const storeToken = async (user) => {
        try {
            await AsyncStorage.setItem("userData", JSON.stringify(user));

        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    return (
        
            
                <View style={styles.screen}>
                    <Image source={require('../../Image/logo2.png')} style={styles.image} />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Email"
                        placeholderTextColor="black"
                        onChangeText={handleEmail}
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={forgotPassword}
                    >
                        <Text style={styles.submitButtonText}>Reset</Text>
                    </TouchableOpacity>
                    <View style={styles.loginBtn}>
                        <Text style={{ color: 'gray' }}>Do you remember password?</Text>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Login')}
                        >
                            <Text style={{ color: color.primary, fontFamily: 'firacode' }}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            
       
    );
}

const styles = StyleSheet.create({
    screen: {
        marginTop: 0,
        flex: 2,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: color.whiteColor,
        alignItems: 'center'
    },
    image: {
        width: 240,
        marginTop:50,
    },
    text: {
        marginLeft: 0,
        fontFamily: 'firacode',
        color: 'gray'
    },
    input: {
        width: '80%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 4,
        backgroundColor: color.whiteColor,
        marginTop: 20,
        padding: 10
    },
    submitButton: {
        width: '85%',
        backgroundColor: color.primary,
        padding: 15,
        margin: 15,
        marginTop: 40,
        alignItems: "center",
        height: 50,
        width: '80%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 4,
    },
    submitButtonText: {
        color: color.whiteColor,
        fontFamily: 'firacode'
    },
   
    loginBtn: {
        flexDirection: 'row',
        marginTop: 110,
        color: 'gray'
    },


});
export default ForgotPassword;