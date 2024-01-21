import PRODUCTS from "../../data/dummy-data";
import { SET_PRODUCT } from "../action/product";
const initialState ={
    avaiableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod=>prod.ownerId==='u1')
}

export default (state=initialState,action)=>{
      
    switch(action.type){
        case SET_PRODUCT:
            return{
                ...state,
                avaiableProducts:action.products,
                userProducts:action.products,
            }
    }
    return state;
}