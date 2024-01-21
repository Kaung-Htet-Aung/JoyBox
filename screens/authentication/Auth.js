import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import * as userActions from '../../store/action/user'
import { app } from "../../config/firebase";
import color from "../../constants/color";
import { SocialIcon } from 'react-native-elements'

const Login = (props) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('')
    const [userdata, setuserdata] = useState()
    const [username, setname] = useState('')
    const [isloading, setisloading] = useState(false)
    const dispatch = useDispatch();
    const handleEmail = text => {
        setemail(text)
    };
    const handlePassword = text => {
        setpassword(text)
    };

    const storeToken = async (user) => {
        try {
            await AsyncStorage.setItem("userData", JSON.stringify(user));

        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    return (
        <ScrollView style={styles.container}>

            <KeyboardAvoidingView>
                <View style={styles.screen}>

                    <Image source={require('../../Image/logo2.png')} style={styles.image} />
                    <Text style={styles.text}>Login To Your Account</Text>
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
                                .signInWithEmailAndPassword(email, password)
                                .then(async (res) => {
                                    setisloading(false)
                                    storeToken(JSON.stringify(res.user));
                                    dispatch(userActions.setUser(await AsyncStorage.getItem('userData')));

                                })
                                .catch(error => {
                                    // Handle Errors here.
                                    setisloading(false)
                                    alert(error.message)

                                });


                        }}
                    >
                        <Text style={styles.submitButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            props.navigation.navigate('Forgot')
                        }}
                    >
                        <Text style={{ color: 'red', fontFamily: 'firacode' }}>Forgot Password</Text>
                    </TouchableOpacity>
                    <ActivityIndicator style={styles.indicator} size="large" color={color.primary} animating={isloading} />
    
                    <View style={styles.signupBtn}>
                        <Text style={{ color: 'gray' }}>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('SignUp')}
                        >
                            <Text style={{ color: color.primary, fontFamily: 'firacode' }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </ScrollView>
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
    container: {
        backgroundColor: color.whiteColor
    },
    image: {
        width: 240,
        marginTop:80,

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
    indicator: {
        position: 'relative'
    },
   
    signupBtn: {
        flexDirection: 'row',
        marginTop: 110,
        color: 'gray'
    },


});
export default Login;