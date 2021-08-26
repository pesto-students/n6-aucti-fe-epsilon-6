import axios from "axios";
import { bidsURL } from "../api";

export const getBids = () => {
	return axios.get(bidsURL).then((res) => res.data);
};

export const getByerBids = (userId, currentPage, itemsPerPage) => {
	return axios
		.get(bidsURL + "/" + userId + "," + currentPage + "," + itemsPerPage)
		.then((res) => res.data);
};

export const OverrideBid = (bid) => {
	return axios.put(bidsURL, { bid }).then((res) => res.data);
};

export const deleteBid = (id) => {
	return axios.delete(bidsURL + "/" + id).then((res) => res.data);
};
