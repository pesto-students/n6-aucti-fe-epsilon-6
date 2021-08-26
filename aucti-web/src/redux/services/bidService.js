import axios from "axios";
import { bidsURL } from "../api";

export const getBids = () => {
	return axios.get(bidsURL).then((res) => res.data);
};

export const getByerBids = (userId) => {
	return axios.get(bidsURL + "/" + userId).then((res) => res.data);
};
