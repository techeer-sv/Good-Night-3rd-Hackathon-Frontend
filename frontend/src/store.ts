import { create } from 'zustand';
import { GotWish } from './interface/Wish';

interface WishStore {
  wishId: number;
  wishList: GotWish[];
  findByWish: (id: number) => GotWish | undefined;
  setWishList: (wishes: GotWish[]) => void;
  setWishId: (wishId: number) => void;
  resetAll: () => void;
}
const initialState = {
  wishId: 0,
  wishList: [] as GotWish[], // TypeScript에서 타입 명시
};
const useWishStore = create<WishStore>((set, get) => ({
  wishId: 0,
  wishList: [],
  findByWish: (id) => {
    return get().wishList.find((wish) => (wish.wishId = id));
  },
  setWishList: (wishes: GotWish[]) => {
    set({ wishList: wishes });
  },
  setWishId: (wishId: number) => {
    set({ wishId });
  },
  resetAll: () => {
    set(initialState); // 상태를 초기 상태로 재설정
  },
}));

export default useWishStore;
