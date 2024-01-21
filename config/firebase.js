import * as firebase from 'firebase';
var firebaseConfig ={
    apiKey: "AIzaSyC60Ho2pTnapksVBRb93yAg-fi2CTcJYVU",
    authDomain: "joybox-953d4.firebaseapp.com",
    databaseURL: "https://joybox-953d4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "joybox-953d4",
    storageBucket: "joybox-953d4.appspot.com",
    messagingSenderId: "536697762848",
    appId: "1:536697762848:web:97c8290e5d0695e83cf845",
    measurementId: "G-9RRGLFEP9L"
};
// Initialize Firebase
if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
} else {
     firebase.app(); // if already initialized, use that one
}
export const app=firebase;
export const storage=firebase.storage()