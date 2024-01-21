import React, { useState} from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image,KeyboardAvoidingView, ScrollView,ActivityIndicator} from "react-native";
import { app } from "../../config/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from "../../constants/color";
import { SocialIcon } from 'react-native-elements'
import { useDispatch } from "react-redux";
import * as userActions from '../../store/action/user'
const Login = (props) => {
    const [email, setemail] = useState('');
    const [username, setname] = useState('')
    const [password, setpassword] = useState('')
    const [isloading, setisloading] = useState(false)
    const dispatch =useDispatch()
    const handleEmail = text => {
        setemail(text)
    };
    const handlePassword = text => {
        setpassword(text)
    };
    const handleName = text => {
        setname(text)
    };
    const storeToken = async (user, username) => {
        try {
            await AsyncStorage.setItem("userData", JSON.stringify(user));
            await AsyncStorage.setItem("name",username);

        } catch (error) {
            console.log("Something went wrong", error);
        }
    }


    return (
       
        <View style={styles.screen}>
            <Image source={require('../../Image/logo2.png')} style={styles.image} />
            <Text style={styles.text}>Create Your Account</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Name"
                placeholderTextColor="black"
                onChangeText={handleName}
            />

            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="black"
                onChangeText={handleEmail}
            />

            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={handlePassword}
            />
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                        setisloading(true)
                        app.auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(async(res) => {
                            setisloading(false)
                            storeToken(JSON.stringify(res.user),username);
                            dispatch(userActions.setUser(await AsyncStorage.getItem('userData')))
                        })
                        .catch(error => {
                            // Handle Errors here.
                            setisloading(false)
                            alert(error.message)

                        });


                }}
            >
                <Text style={styles.submitButtonText}> Sign in</Text>
            </TouchableOpacity>
            <ActivityIndicator style={styles.indicator} size="large" color={color.primary} animating={isloading}/>


            <View style={styles.loginBtn}>
                <Text style={{color:'gray'}}>Do you have already an account?</Text>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Login')}
                >
                    <Text style={{color:color.primary,fontFamily:'firacode'}}>Login</Text>
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
        marginTop:10,

    },
    text: {
        marginLeft: '-40%',
        fontFamily: 'firacode',
        color: 'gray'
    },
    indicator: {
        position:'relative'
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
        marginTop:60,
        color: 'gray'
    },


});
export default Login;
