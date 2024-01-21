import Order from '../../models/Orders'
export const DELETE_ORDER = "DELETE_ORDER"
export const SET_ORDER='SET_ORDER'
export const fetchOrder = () => {
    return async dispatch => {
        const response = await fetch('https://joybox-953d4-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {

        })
        const resData = await response.json();
        const loadedOrders = [];
        for (const key in resData) {
            loadedOrders.push(
                new Order(
                    key,
                    resData[key].cartItem,
                    resData[key].date,
                    resData[key].orderInfo,
                    resData[key].totalAmount
                )
            )
        }
        
        dispatch({
            type: SET_ORDER,
            orders: loadedOrders
        })
    }
}

export const deleteOrder = (id) => {
    return async dispatch => {
        await fetch(`https://joybox-953d4-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${id}.json`,
            {
                method: 'DELETE',

            })
        dispatch(
            { type: DELETE_ORDER, id:id }
        )
    }
}
