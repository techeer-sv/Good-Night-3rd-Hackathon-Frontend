export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
}
