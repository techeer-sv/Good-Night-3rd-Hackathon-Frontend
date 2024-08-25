export interface Wish {
  id: number;
  title: string;
  content: string;
  category:
    | '진로'
    | '건강'
    | '인간 관계'
    | '돈'
    | '목표'
    | '학업/성적'
    | '기타';
  createdAt: Date;
  updatedAt: Date | null;
  is_confirm: '승임됨' | '보류됨' | '거절됨';
}
