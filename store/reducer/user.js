import { SET_USER } from "../action/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";


export default (state={user:null},action)=>{
    switch(action.type){
        case SET_USER:
        return {
            ...state,
            user:action.user
        }
    }
    return state;
    
}