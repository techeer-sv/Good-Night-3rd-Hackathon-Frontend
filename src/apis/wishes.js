import axios from "axios";

const BASE_URL = `http://localhost:8080`;

export const fetchWishes = async (page, size) => {
  try {
    const response = await axios.get(`${BASE_URL}/wishes`, {
      params: {
        status: "CONFIRMED",
        page: page,
        size: size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching wishes:", error);
    throw error;
  }
};

export const fetchWishesByCategory = async (category, page, size) => {
  try {
    const wishes = await fetchWishes(page, size);

    // 카테고리가 "전체"인 경우 필터링 없이 모든 소원을 반환
    if (category === "전체") {
      return wishes;
    }

    // 특정 카테고리로 필터링
    const filteredWishes = wishes.filter((wish) => wish.category === category);
    return filteredWishes;
  } catch (error) {
    console.error("Error fetching or filtering wishes:", error);
    throw error;
  }
};

export const createWish = async (wishData) => {
  try {
    const response = await axios.post(`${BASE_URL}/wishes`, wishData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating wish:", error);
    throw error;
  }
};

export const getWishById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/wishes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wish by id:", error);
    throw error;
  }
};

// PENDING 상태의 소원들을 가져오는 함수
export const fetchPendingWishes = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/wishes`, {
      params: {
        status: "PENDING",
        page: page,
        size: size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pending wishes:", error);
    throw error;
  }
};

// 소원의 상태를 업데이트하는 함수
export const updateWishStatus = async (id, confirmStatus) => {
  try {
    const response = await axios.patch(`${BASE_URL}/wishes/${id}`, {
      confirmStatus: confirmStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating wish status:", error);
    throw error;
  }
};
