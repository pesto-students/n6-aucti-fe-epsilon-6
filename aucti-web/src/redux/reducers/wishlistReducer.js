import * as types from '../types'
const initialState = false
export const wishlistReducer = (state = initialState, action)=>{
    switch (action.type){
        case types.WISHLIST_ADDED:
             return action.added
        default : 
             return state;
    }

}