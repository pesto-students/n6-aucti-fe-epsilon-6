// import { gql } from '@apollo/client';
// import gqlClient from '../../graphql/client';
import api from '../api';
import { productURL, publicURL } from '../apis';

export const getProductPerUser = (product_id, user_id) => {
  return api
    .get(productURL + '/product/' + product_id + ',' + user_id)
    .then(response => response.data);
};
export const getProduct = product_id => {
  return api.get(publicURL + '/' + product_id).then(response => response.data);
};
export const getProducts = (firstPageIndex, lastPageIndex) => {
  return api
    .get(publicURL + '/all/' + firstPageIndex + ',' + lastPageIndex)
    .then(response => response.data);
  // return gqlClient
  //   .query({
  //     query: gql`
  //       {
  //         products(firstPageIndex:${firstPageIndex}, lastPageIndex:${lastPageIndex}) {
  //           data {
  //             title
  //             id
  //             base_price
  //             highest_price
  //             bids
  //             product_picture
  //           }
  //           length
  //         }
  //       }
  //     `,
  //   })
  //   .then(response => response.data.products);
};

export const getLatestProducts = (firstPageIndex, lastPageIndex) => {
  return api
    .get(publicURL + '/latest/' + firstPageIndex + ',' + lastPageIndex)
    .then(response => response.data);
};

export const getHotProducts = (firstPageIndex, lastPageIndex) => {
  return api
    .get(publicURL + '/hot/' + firstPageIndex + ',' + lastPageIndex)
    .then(response => response.data);
};
