import { ADD_TO_CART,REMOVE_FROM_CART} from "../action/cart";
import { ADD_ORDER } from "../action/order";
import CartItem from '../../models/cart'
const initialState ={
    item:{},
    totalAmount:0
}

export default (state=initialState,action)=>{
   switch(action.type){
       case ADD_TO_CART:
           const addedProduct=action.product;
           const prodTitle=addedProduct.title;
           const prodPrice=addedProduct.price;
           
           if(state.item[addedProduct.id]){
                   //already have item 
                   const updateItem =new CartItem(
                       state.item[addedProduct.id].quantity+1,
                       prodPrice,
                       prodTitle,
                       state.item[addedProduct.id].sum+prodPrice,
                    
                   )
                   return{
                       ...state,
                       item:{...state.item, [addedProduct.id]:updateItem},
                       totalAmount:state.totalAmount+prodPrice
                   }
           }else{
               const newCartItem =new CartItem(1,prodPrice,prodTitle,prodPrice)
               return{
                   ...state,
                   item:{...state.item,[addedProduct.id]:newCartItem},
                   totalAmount:state.totalAmount+prodPrice
               }
           }
           case REMOVE_FROM_CART:           
               const selectedProduct =state.item[action.productId];
               const curQuantity=selectedProduct.quantity;
               let updatedCartItem;
               if(curQuantity>1){
                    //reduce cart 
                    const cartItem=new CartItem(
                        selectedProduct.quantity-1,
                        selectedProduct.productPrice,
                        selectedProduct.productTitle,
                        selectedProduct.sum-selectedProduct.productPrice
                        )
                     updatedCartItem={...state.item,[action.productId]:cartItem}
               }else{
                    updatedCartItem={...state.item};
                    delete updatedCartItem[action.productId];
               }return{
                   ...state,
                   item:updatedCartItem,
                   totalAmount:state.totalAmount-selectedProduct.productPrice
               }

           case ADD_ORDER: return initialState;
           
           default:return state;
   }
   
}