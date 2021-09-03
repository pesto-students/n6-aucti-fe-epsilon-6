import * as types from '../types'
const initialState = false
export const bidReducer = (state = initialState, action)=>{
    switch (action.type){
        case types.BID_PLACED:
             return action.bidplaced
        default : 
             return state;

    }

}