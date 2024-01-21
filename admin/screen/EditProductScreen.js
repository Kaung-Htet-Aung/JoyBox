import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity, Image, Button, YellowBox } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/color'
import * as productActions from '../store/action/product'
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
const EditProductScreen = ({ navigation, route }) => {

    const { productId } = route.params;
    const dispatch = useDispatch();
    const editedProduct = useSelector(state => state.products.userProducts.find(prod =>
        prod.id === productId
    ))
    const [title, settitle] = useState(editedProduct ? editedProduct.title : '');
    const [price, setprice] = useState(editedProduct ? editedProduct.price : '')
    const priceString = price.toString();
    const [large, setlarge] = useState(editedProduct ? editedProduct.description[0] :'')
    const [samll, setsamll] = useState(editedProduct ? editedProduct.description[1] :'')
    const [medium, setmedium] = useState(editedProduct ? editedProduct.description[2] :'')
    const intPrice = parseInt(priceString)
    const [imgUrl, setimgUrl] = useState(editedProduct ? editedProduct.imgUrl : null);

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
            const uploadUrl = await uploadImageAsync(image, filename);
            setimgUrl(uploadUrl)


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

        return await snapshot.ref.getDownloadURL();
    }


    const submitHandler = useCallback(() => {
        const descriptionArray = [large, medium, samll]
        if (editedProduct) {
            if (title !== '' && imgUrl !== '') {
                dispatch(productActions.updateProduct(productId, title, imgUrl, descriptionArray, intPrice))
                alert("One item has successfully added")
            }

        } else if (title !== '' !== '' && imgUrl !== '') {
            dispatch(productActions.createProduct(title, imgUrl, descriptionArray, intPrice))
            alert("One item has successfully added")
        } else Alert.alert("Input Error!", "check your input again");


    }, [dispatch, productId, title, imgUrl, samll, medium, large, price])
    useEffect(() => {
        navigation.setParams({ submit: submitHandler })
    }, [submitHandler])


    return (

        <View style={styles.form}>
            <Text style={styles.text}>Title</Text>
            <TextInput
                placeholder="Enter title here"
                style={styles.input}
                value={title}
                onChangeText={(value) => {
                    settitle(value)
                }}
            />
            <Text style={styles.text}>Image</Text>
            <View style={styles.imgContainer}>
                <TouchableOpacity style={styles.pick}
                    onPress={() => {
                        pickImage()
                    }}>
                    <Text style={{ padding: 17, color: Colors.whiteColor }}>Pick Image</Text>
                </TouchableOpacity>
                <View>
                    <Image source={{ uri: imgUrl }} style={{ width: 116, height: 100, margin: 15, marginTop: 10 }} />
                </View>

            </View>
            <Text style={styles.text}>Large</Text>
            <TextInput
                placeholder="Enter Large Size Price here"
                style={styles.input}
                value={large}
                keyboardType='number-pad'
                onChangeText={(value) => {
                    setlarge(value)
                }}
            />
            <Text style={styles.text}>Medium</Text>
            <TextInput
                placeholder="Enter Medium Size Price here"
                style={styles.input}
                value={medium}
                keyboardType='number-pad'
                onChangeText={(value) => {
                    setmedium(value)
                }}
            />
            <Text style={styles.text}>Small</Text>
            <TextInput
                placeholder="Enter Small Size Price here"
                style={styles.input}
                keyboardType='number-pad'
                value={samll}
                onChangeText={(value) => {
                    setsamll(value)
                }}
            />
            {large===""&&medium===""&&samll===""&&(<View>
                <Text style={styles.text}>Price</Text>
                <TextInput
                    keyboardType="number-pad"
                    multiline
                    placeholder="Enter Price here(need to same as medium price)"
                    style={styles.input}
                    value={priceString}
                    onChangeText={(value) => {
                        setprice(value)
                    }}
                />
            </View>
            )}

        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        width: '100%',
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
    text: {
        marginLeft: 5,
        marginTop: 16,
        fontFamily: 'firacode',
        fontWeight: 'bold'
    },
    pick: {
        width: 116,
        margin: 5,
        marginLeft: 1,
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
    }
})


export default EditProductScreen;