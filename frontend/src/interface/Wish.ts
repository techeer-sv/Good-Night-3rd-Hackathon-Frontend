export interface CreatedWish {
  //wish 생성시 필요한 인터페이스
  title: String;
  content: String;
  category: String;
}

export interface GotWish {
  wishId: number;
  title: String;
  content: String;
  category: String;
  isConfirmed: boolean; // 승인여부 확인
}
