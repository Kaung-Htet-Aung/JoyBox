import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, Platform, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select'
import * as ImagePicker from 'expo-image-picker';
import * as orderActions from '../../store/action/order'
import Colors from '../../constants/color';
import { app } from '../../config/firebase'
import { storage } from '../../config/firebase'
import { KeyboardAvoidingView } from 'react-native';
import { set } from 'react-native-reanimated';
const OrderInforamtion = ({ navigation, route }) => {
    const { item } = route.params;
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();
    const [name, setname] = useState("");
    const [description, setdescription] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [address, setaddress] = useState("");
    const [size, setsize] = useState("");
    const [myself, setmyself] = useState(true)
    const [surprised, setsurprised] = useState(false);
    const [myselfBg, setmyselfBg] = useState(true)
    const [surprisedBg, setsurprisedBg] = useState(false)
    const [imgUrl, setimgUrl] = useState("");
    const [isloading, setisloading] = useState(false)
    const [surphoneNumber, setsurphoneNumber] = useState("")
    const [filename, setfilename] = useState("");
    const informations = [{ name: name, address: address, phoneNumber: phoneNumber, surphoneNumber: surphoneNumber, size: size,filename:filename,imgUrl: imgUrl, description: description, }]
    const userChosenSize= size;
    let avaisize= item.map(prod=>{return prod.description})
    item.map((prod)=>{
        prod.info=userChosenSize
    })
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();  
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            let image = result.uri
            let filename = image.substring(image.lastIndexOf('/') + 1)
            setisloading(true)
            const uploadUrl = await uploadImageAsync(image, filename);
            setimgUrl(uploadUrl)
            setisloading(false)

        }
    }
    async function uploadImageAsync(uri, filename) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const ref = storage.ref().child(`image/${filename}`);
        const snapshot = await ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();
        setfilename(filename)
        return await snapshot.ref.getDownloadURL();
    }
   
    const addOrder = () => {
        if (name && phoneNumber && address && size) {
            dispatch(orderActions.addOrder(item, cartTotalAmount, informations))
            Alert.alert('✅', 'Thank You For Your Order', [
                {
                    text: "Ok",
                    onPress:()=>{
                      navigation.navigate('Products')
                     }

                }

            ])
        } else {
            Alert.alert('❌', 'Something need to fill', [
                {
                    text: "Ok",

                }

            ])
        }
        
        setname("")
    }
    const surprisedOrder = () => {
        if (name && phoneNumber && surphoneNumber && address && size && !isloading) {
            dispatch(orderActions.addOrder(item, cartTotalAmount, informations))
            Alert.alert('✅', 'Thank You For Your Order', [
                {
                    text: "Ok",
                    onPress:()=>{
                        navigation.navigate('Products')
                    }

                }

            ])
        } else {
            Alert.alert('❌', 'Something need to fill', [
                {
                    text: "Ok",

                }

            ])
        }
    }

    return (

        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView>
                <View style={styles.whofor}>
                    <TouchableOpacity style={myselfBg ? styles.whoforBtn : styles.whiteBtnBackground}
                        onPress={() => {
                            setmyselfBg(true)
                            setmyself(true)
                            setsurprisedBg(false)
                            setsurprised(false)
                        }}>
                        <Text style={myselfBg ? styles.textColor : styles.textColorBlack}>For myself</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={surprisedBg ? styles.whoforBtn : styles.whiteBtnBackground}
                        onPress={() => {
                            setmyselfBg(false)
                            setsurprisedBg(true)
                            setsurprised(true)
                            setmyself(false)
                        }}>
                        <Text style={surprisedBg ? styles.textColor : styles.textColorBlack}>Surprised Gift</Text>
                    </TouchableOpacity>
                </View>

                {myself && (
                    <View style={styles.form}>
                        <Text style={styles.text}>Name</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Enter your name here"
                                style={styles.input}
                                value={name}
                                onChangeText={(value) => {
                                    setname(value)
                                }}
                            />
                        </View>
                        <Text style={styles.text}>Phone Number</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Enter your Phone Number here"
                                style={styles.input}
                                keyboardType="number-pad"
                                
                                onChangeText={(value) => {
                                    setphoneNumber(value)
                                }}
                            />
                        </View>

                        <Text style={styles.text}>Address</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                multiline
                                placeholder="Enter your Address here"
                                style={styles.input}
                                onChangeText={(value) => {
                                    setaddress(value)
                                }}
                            />
                        </View>
                        <View style={styles.select}>
                            <RNPickerSelect
                                onValueChange={(value) => setsize(value)}
                                placeholder={{
                                    label: "Choice product size you want to order",
                                    value: null,
                                }}

                                items={[
                                    { label: 'Small', value: 'Small' },
                                    { label: 'Medium', value: 'Medium' },
                                    { label: 'Large', value: 'Large' },
                                ]}
                                style={styles.select}
                            />
                        </View>
                       {avaisize[0]!==""&&avaisize[1]!==""&&avaisize[2]!==""&&( <View style={styles.inputContainer}>
                            <View style={styles.size}>
                                <Text>Size</Text>
                                <Text>{size}</Text>
                            </View>
                        </View>)}
                    </View>

                )}

                {surprised && (
                    <View style={styles.form}>
                        <Text style={styles.text}>Name</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Enter name who you want to give"
                                style={styles.input}
                                onChangeText={(value) => {
                                    setname(value)
                                }}
                            />
                        </View>
                        <Text style={styles.text}>Phone Number</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Enter your Phone Number"
                                style={styles.input}
                                keyboardType="number-pad"
                                onChangeText={(value) => {
                                    setphoneNumber(value)
                                }}
                            />
                        </View>
                        <Text style={styles.text}>Phone Number</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Enter surprised gift recipient's phone number"
                                style={styles.input}
                                keyboardType="number-pad"
                                onChangeText={(value) => {
                                    setsurphoneNumber(value)
                                }}
                            />
                        </View>
                        <Text style={styles.text}>Address</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                multiline
                                placeholder="Enter the person's address who you want to give"
                                style={styles.input}
                                onChangeText={(value) => {
                                    setaddress(value)
                                }}
                            />
                        </View>
                        <Text style={styles.text}>What do you want to say?</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                multiline
                                placeholder="What do you want to say to him/her?(can skip)"
                                style={styles.description}

                                onChangeText={(value) => {
                                    setdescription(value)
                                }}
                            />
                        </View>
                        <View style={styles.select}>
                            <RNPickerSelect
                                onValueChange={(value) => setsize(value)}
                                placeholder={{
                                    label: "Choice product size you want to order",
                                    value: null,
                                }}

                                items={[
                                    { label: 'Small', value: 'Small' },
                                    { label: 'Medium', value: 'Medium' },
                                    { label: 'Large', value: 'Large' },
                                ]}
                                style={styles.select}
                            />

                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.size}>

                                <Text>Size</Text>
                                <Text>{size}</Text>
                            </View>
                        </View>
                        <View style={styles.imgContainer}>
                            <TouchableOpacity style={styles.pick}
                                onPress={() => {
                                    pickImage()
                                }}>
                                <Text style={{ padding: 17, color: Colors.whiteColor }}>Pick Image</Text>
                            </TouchableOpacity>
                            <View style={styles.indicator}>
                                {(isloading && <Text>Uploading image...</Text>)}
                                <ActivityIndicator size="large" animating={isloading} color={Colors.primary} /></View>

                            {imgUrl !== "" && (<View>
                                <Image source={{ uri: imgUrl }} style={{ width: 116, height: 100, margin: 15, marginTop: 10 }} />
                            </View>)}
                        </View>
                    </View>


                )}
                {myself && (
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.myselfsubmit}

                            onPress={addOrder}

                        >
                            <Text style={{ color: Colors.whiteColor }}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {surprised && (
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.sursubmit}
                            onPress={surprisedOrder}
                        >
                            <Text style={{ color: Colors.whiteColor }}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingView>
        </ScrollView>

    )

}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
    },
    textColorBlack: {
        color: 'black'
    },
    whofor: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    indicator: {
        marginTop: 26,
    },
    whiteBtnBackground: {
        width: 120,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.whiteColor,
        padding: 10,
        color: Colors.primary,
        alignItems: 'center'
    },
    whoforBtn: {
        width: 120,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        padding: 10,
        color: Colors.whiteColor,
        alignItems: 'center'
    },
    textColor: {
        color: Colors.whiteColor
    },
    form: {
        width: '100%',
        marginTop: 5,
    },
    select: {
        marginTop: 20,
    },
    input: {
        width: '92%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.whiteColor,
        marginTop: 0,
        padding: 10
    },
    description: {
        width: '92%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.whiteColor,
        marginTop: 0,
        padding: 20
    },
    text: {
        marginLeft: 20,
        marginTop: 16,
        fontFamily: 'firacode',
        fontWeight: 'bold'
    },
    size: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '92%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: Colors.whiteColor,
        marginTop: 10,
        padding: 10,

    },
    submitContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: -1
    },
    sursubmit: {
        width: '92%',
        alignItems: 'center',
        backgroundColor: 'green',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        padding: 10,
    },
    myselfsubmit: {
        width: '95%',
        alignItems: 'center',
        backgroundColor: 'green',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,

    },
    pick: {
        width: 116,
        margin: 5,
        marginLeft: 20,
        marginTop: 25,
        backgroundColor: Colors.primary,
        height: 52,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        color: Colors.primary,
        alignItems: 'center'

    },
    imgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center'

    }
});

export default OrderInforamtion;