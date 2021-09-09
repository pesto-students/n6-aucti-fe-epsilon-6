import axios from "axios";
import { productURL, productsURL } from "../api";

export const getProductPerUser = (product_id, user_id) => {
	return axios
		.get(productURL + "/product/" + product_id + "," + user_id)
		.then((response) => response.data);
};
export const getProduct = (product_id) => {
	return axios
		.get(productURL + "/" + product_id)
		.then((response) => response.data);
};
export const getProducts = (firstPageIndex, lastPageIndex) => {
	return axios
		.get(productsURL + "/all/" + firstPageIndex + "," + lastPageIndex)
		.then((response) => response.data);
};

export const getLatestProducts = (firstPageIndex, lastPageIndex) => {
	return axios
		.get(productsURL + "/latest/" + firstPageIndex + "," + lastPageIndex)
		.then((response) => response.data);
};

export const getHotProducts = (firstPageIndex, lastPageIndex) => {
	return axios
		.get(productsURL + "/hot/" + firstPageIndex + "," + lastPageIndex)
		.then((response) => response.data);
};
