
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import * as userActions from '../../store/action/user'
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    Linking,
    Switch,
    TouchableOpacity
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { set } from 'react-native-reanimated';
import color from '../../constants/color'
import { Entypo } from '@expo/vector-icons';
import { app } from '../../config/firebase';
export const CustomSidebarMenu = (props) => {
    const [image, setimage] = useState('https://thumbs.dreamstime.com/b/user-profile-plus-grey-icon-add-new-friend-customer-follow-symbol-user-profile-plus-grey-icon-add-new-friend-customer-191055662.jpg')
    const [name, setname] = useState('')
    const dispatch =useDispatch()
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setimage(result.uri)
            storeToken(result.uri)
        }
    }
    const storeToken = async (url) => {
        try {
            await AsyncStorage.setItem("image", url);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    const get = async () => {
        try {
            const url = await AsyncStorage.getItem("image");
            if (url == null) {
                setimage(image)
            } else {
                setimage(url)
            }
            const name = await AsyncStorage.getItem('name')
            setname(name);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    useEffect(() => {
        get()

    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.imgNameContainer}>
                <TouchableOpacity style={styles.imgContainer} onPress={() => {
                    pickImage()

                }}>
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                    />
                    <Text style={styles.name}>{name}</Text>
                </TouchableOpacity>
            </View>

            <DrawerContentScrollView {...props} style={styles.navItem}>
                <DrawerItemList {...props} />
                <DrawerItem style={styles.signoutBtn}
                    icon={() => (
                        <Entypo name="arrow-bold-left" size={24} color="black" />
                    )}
                    label="Sign Out"
                    labelStyle={styles.label}
                    onPress={async() => {
                        try {

                            app.auth()
                                .signOut()
                                .then(() => console.log('User signed out!'));
                            await AsyncStorage.multiRemove(['userData',"image"]).then(() => {
                                console.log("data remove")
                            });
                            dispatch(userActions.setUser(await AsyncStorage.getItem('userData')))

                        } catch (er) {
                            console.log(er)
                        }
                    }}
                />
            </DrawerContentScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 122,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'gray',
        alignItems:'center'
    },

    imgNameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: -10,
    },
    imgContainer: {
        width: '100%',
        height: 120,
        alignItems: 'center',

    },
    name: {
        marginTop: 10,
        fontFamily: 'oswald',
        fontWeight: 'bold',
        letterSpacing: 3,
    },
    navItem: {
        marginTop: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: -15,
    },
    signoutBtn: {
        marginTop: '150%',
    }
});

