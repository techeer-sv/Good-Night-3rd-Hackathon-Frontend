import axios from 'axios';
import { CreatedWish } from '../interface/Wish';

export const createWish = (wish: CreatedWish) => {
  try {
    const response = axios.post(
      'http://localhost:8080/api/v1/wish/create',
      wish,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    console.log(
      '소원을 저장하는 도중 오류가 발생하였습니다 ERROR ::: => ',
      error,
    );
  }
};

export const getAllWish = () => {};
