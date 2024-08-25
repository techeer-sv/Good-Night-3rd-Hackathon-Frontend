import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SVELTE_APP_BASE_URL;

const axiosInstance = axios.create({
	baseURL: BASE_URL
});

export default axiosInstance;
