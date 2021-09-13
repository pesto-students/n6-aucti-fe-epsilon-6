import axios from "axios";

const api = axios.create({
	baseURL: "https://aucti-api.netlify.app",
	headers: {
		"Content-Type": "application/json",
	},
	validateStatus: () => true,
});

api.interceptors.response.use(
	(response) => response,
	(error) => error
);

export const initializeInterceptor = (token) => {
	api.interceptors.request.use((config) => {
		if (token) {
			config.headers["Authorization"] = token;
		}
		return config;
	});
};

export default api;
