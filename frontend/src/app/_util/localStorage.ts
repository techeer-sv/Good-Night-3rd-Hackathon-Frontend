export enum StorageKey {
  Admin = 'isAdmin',
}

interface Values {
  [StorageKey.Admin]: boolean;
}

export const localStorageUtil = {
  // 해당 키의 값을 가져오고, 필요시 파싱하여 반환
  getItem<K extends StorageKey>(key: K): Values[K] | null {
    const item = window.localStorage.getItem(key);
    if (item === null) return null;

    try {
      return JSON.parse(item) as Values[K];
    } catch {
      return null;
    }
  },

  // 키와 값을 받아 localStorage 에 저장
  setItem<K extends StorageKey>(key: K, value: Values[K]): void {
    try {
      const item = JSON.stringify(value);
      window.localStorage.setItem(key, item);
    } catch {
      console.error(`로컬스토리지에 저장 실패`);
    }
  },
};
