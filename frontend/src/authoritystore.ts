import { create } from 'zustand';

interface AuthorityStore {
  authority: boolean;
  setAuthority: () => void;
}

const useAuthorityStore = create<AuthorityStore>((set, get) => ({
  authority: false,
  setAuthority: () => {
    const state = get();
    set({ authority: !state.authority });
  },
}));

export default useAuthorityStore;
