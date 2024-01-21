import Product from "../../models/products"
import { app } from '../../config/firebase'
let userId;
app.auth().onAuthStateChanged((user) => {
    if (user) {// User logged in already or has just logged in.
        userId = user.uid;
    } else {
        // User not logged in or has just logged out.
    }
});
export const SET_PRODUCT = 'SET_PRODUCT'
export const fetchProduct = () => {
    return async dispatch => {
        const response = await fetch('https://joybox-953d4-default-rtdb.asia-southeast1.firebasedatabase.app/products.json', {

        })
        const resData = await response.json();

        const loadedProducts = [];
        for (const key in resData) {
            loadedProducts.push(
                new Product(
                    key,
                    userId,
                    resData[key].title,
                    resData[key].imgUrl,
                    resData[key].description,
                    resData[key].price
                )
            )
        }

        dispatch({
            type: SET_PRODUCT,
            products: loadedProducts
        })
    }
}