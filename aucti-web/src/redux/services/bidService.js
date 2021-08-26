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
