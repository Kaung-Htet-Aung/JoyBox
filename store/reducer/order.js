import { ADD_ORDER } from "../action/order";
import Order from "../../models/order";
const initialState ={
  order:[],
}

export default (state=initialState,action)=>{
    switch(action.type){
        case ADD_ORDER:
            const newOrder= new Order(
                action.orderData.id,
                action.orderData.item,
                action.orderData.amount,
                action.orderData.date,
                action.orderData.orderInfo
            );
        return {
            ...state,
            order:state.order.concat(newOrder)
        }
    }
    return state;
    
}