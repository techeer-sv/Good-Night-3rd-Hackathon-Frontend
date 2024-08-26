import { create } from 'zustand';
import { GotWish } from './interface/Wish';

interface WishStore {
  wishList: GotWish[];
  findByWish: (id: number) => GotWish | undefined;
  setWishList: (wishes: GotWish[]) => void;
}

const useWishStore = create<WishStore>((set, get) => ({
  wishList: [],
  findByWish: (id) => {
    return get().wishList.find((wish) => (wish.wishId = id));
  },
  setWishList: (wishes: GotWish[]) => {
    set({ wishList: wishes });
  },
}));

export default useWishStore;
