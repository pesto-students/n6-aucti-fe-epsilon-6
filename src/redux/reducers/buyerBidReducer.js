/* eslint-disable no-case-declarations */
import { BUYER } from '../types';

const initialState = [];

export const buyerBidReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUYER.BUYER_BIDS_LOADED:
      return action.buyerBids;
    case BUYER.BID_OVERRIDED:
      const filtered = state.data.filter(
        dataRef => dataRef.id !== action.buyerBid.id,
      );

      return {
        data: [action.buyerBid, ...filtered],
        length: state.length,
      };

    case BUYER.BID_DELETED:
      const filteredDel = state.data.filter(
        dataRef => dataRef.id !== action.id,
      );

      return {
        data: filteredDel,
        length: state.length - 1,
      };
    default:
      return state;
  }
};
