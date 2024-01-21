
import {app} from '../../config/firebase'
export const ADD_ORDER='ADD_ORDER';

export const addOrder=(cartItem,totalAmount,orderInfo)=>{
    let date =new Date();
    return async dispatch => {
        const response = await fetch(`https://joybox-953d4-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItem,
                totalAmount,
                date:date.toISOString(),
                orderInfo,
            })
        })
        let resData = await response.json();

        dispatch({
            type:ADD_ORDER,
            orderData:{id:resData.name,item:cartItem,amount:totalAmount,orderInfo:orderInfo,date}
        })
    }
}
