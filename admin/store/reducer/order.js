import { ORDERS } from "../../data/dummy-data";
import { SET_ORDER, DELETE_ORDER } from "../action/order";

const initialState = {
    order: ORDERS,

}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER:
            return {
                ...state,
                order: action.orders
            }
        case DELETE_ORDER: {
            return {
                ...state,
                order: state.order.filter(order =>order.id !== action.id),
            }
        }

    }

    return state;
}