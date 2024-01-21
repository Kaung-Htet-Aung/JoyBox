import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/products";
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT,SET_PRODUCT} from "../action/product";
const initialState = {
    avaiableProducts: [],
    userProducts: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            return {
                ...state,
                avaiableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }
        
         case 'CREATE_PRODUCT':{
                const newProduct = new Product(
                    action.productData.id,
                    'u1',
                    action.productData.title,
                    action.productData.imgUrl,
                    action.productData.description,
                    action.productData.price
                )
                return {
                    ...state,
                    avaiableProducts: state.avaiableProducts.concat(newProduct),
                    userProducts: state.userProducts.concat(newProduct)
                }
            }
        case "UPDATE_PRODUCT": {
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.productId)
            const updatedProduct = new Product(
                action.productId,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imgUrl,
                action.productData.description,
                action.productData.price,
            )
            const updatedUserProduct = [...state.userProducts];
            updatedUserProduct[productIndex] = updatedProduct;
            const avaiableProductIndex = state.avaiableProducts.findIndex(prod => {
                prod.id = action.productData.productId
            })
            const updatedAvailableProduct = [...state.avaiableProducts];
            updatedAvailableProduct[avaiableProductIndex] = updatedProduct
            return {
                ...state,
                avaiableProducts: updatedAvailableProduct,
                userProducts: updatedUserProduct
            }
        }
        case 'DELETE_PRODUCT': {
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.productId),
                avaiableProducts: state.avaiableProducts.filter(product =>
                    product.id !== action.productId
                )
            }
        }
    }
    return state;
}