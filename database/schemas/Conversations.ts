// arango document: Conversation
export const ConversationSchema = {
  name: "Conversation",
  fields: {
    id: {
      type: "number",
      required: true,
    },
    name: {
      type: "string",
    },
    participants: {
      type: "array",
      required: true,
    },
    created_at: {
      type: "date",
      required: true,
    },
    updated_at: {
      type: "date",
      required: true,
    },
    avatar: {
      type: "string",
      required: true,
    },
  },
  indexes: [
    {
      type: "hash",
      fields: ["id"],
      unique: true,
    },
  ],
};

export type Conversation = {
  id: number;
  name: string;
  participants: number[];
  created_at: Date;
  updated_at: Date;
  avatar: string;
};

