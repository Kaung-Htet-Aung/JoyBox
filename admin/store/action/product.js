export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT'
import Product from "../../models/products";
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
                    'u1',
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

export const deleteProduct = (productId) => {
    return async dispatch => {
        await fetch(`https://joybox-953d4-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json`,
            {
                method: 'DELETE',

            })
        dispatch(
            { type: DELETE_PRODUCT, productId: productId }
        )
    }
}

export const createProduct = (title, imgUrl, description, price) => {
    return async dispatch => {
        const response = await fetch('https://joybox-953d4-default-rtdb.asia-southeast1.firebasedatabase.app/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imgUrl,
                price
            })
        });
        if(!response.ok){
             throw new Error("Something went wrong!")
        }
        let resData = await response.json();
        dispatch({
            type: 'CREATE_PRODUCT',
            productData: {
                id: resData.name,
                title,
                description,
                imgUrl,
                price
            }
        })
    }
}
export const updateProduct = (id, title, imgUrl, description, price) => {
    return async dispatch => {
        await fetch(`https://joybox-953d4-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imgUrl,
                    price
                })
            })
        dispatch({
            type: 'UPDATE_PRODUCT',
            productId: id,
            productData: {
                title,
                description,
                imgUrl,
                price
            }
        })
    }


}