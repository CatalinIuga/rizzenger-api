export type Conversation = {
  id: string;
  name: string;
  participants: string[];
  created_at: Date;
  updated_at: Date;
  avatar: string;
};

export type ConversationSchema = {
  id: string;
  name: string;
  participants: string[];
  created_at: number;
  updated_at: number;
  avatar: string;
};
