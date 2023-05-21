export type Message = {
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted: boolean;
};
