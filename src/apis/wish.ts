import axiosInstance from './axios.config';

export const postWish = async (title: string, category: string, content: string) => {
	try {
		const response = await axiosInstance.post('/wishes', { title, category, content });
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getWishList = async (category?: string, is_confirmed?: string | null) => {
	try {
		const params: { category?: string; is_confirmed?: string } = {};

		if (category) {
			params.category = category;
		}

		if (is_confirmed) {
			params.is_confirmed = is_confirmed;
		}

		// axios 요청을 보냅니다.
		const response = await axiosInstance.get('/wishes', { params });
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getWishDetail = async (id: number) => {
	try {
		const response = await axiosInstance.get(`/wishes/${id}`);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const deleteWish = async (id: number) => {
	try {
		const response = await axiosInstance.delete(`/wishes/${id}`);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const updateApprovalWish = async (id: number, is_confirmed: boolean) => {
	try {
		// 쿼리 파라미터로 is_confirmed 값을 전달
		const response = await axiosInstance.patch(`/wishes/${id}`, null, {
			params: { is_confirmed }
		});
		return response.data;
	} catch (error) {
		return error;
	}
};
