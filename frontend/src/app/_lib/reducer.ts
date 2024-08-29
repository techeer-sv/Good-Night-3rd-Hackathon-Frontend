// Reducer 액션 타입 정의
import { Wish } from '@/model/Wish';

type Action =
  | { type: 'SET_CATEGORY'; category: string }
  | { type: 'FETCH_SUCCESS'; wishes: Wish[] }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'INCREMENT_PAGE' }
  | { type: 'RESET_WISHES' }
  | { type: 'SET_HAS_MORE'; hasMore: boolean };

// 상태 타입 정의
type State = {
  category: string;
  wishes: Wish[];
  page: number;
  isLoading: boolean;
  hasMore: boolean;
};
// 초기 상태 정의
export const initialState: State = {
  category: '',
  wishes: [],
  page: 1,
  isLoading: false,
  hasMore: true,
};
// Reducer 함수 정의
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.category };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        wishes: [...state.wishes, ...action.wishes],
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'INCREMENT_PAGE':
      return { ...state, page: state.page + 1 };
    case 'RESET_WISHES':
      return { ...state, page: 1, wishes: [], hasMore: true };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.hasMore };
    default:
      throw new Error(
        `올바른 액션 타입이 아닙니다 : ${(action as Action).type}`,
      );
  }
}
