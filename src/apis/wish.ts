import axiosInstance from './axios.config';

export const postWish = async (title: string, category: string, content: string) => {
	try {
		const response = await axiosInstance.post('/wishes', { title, category, content });
		return response.data;
	} catch (error) {
		return error;
	}
};
