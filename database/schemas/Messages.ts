// arango document: Messages

export const MessagesSchema = {
  name: "Messages",
  fields: {
    id: {
      type: "number",
      required: true,
    },
    conversation_id: {
      type: "number",
      required: true,
    },
    sender_id: {
      type: "number",
      required: true,
    },
    content: {
      type: "string",
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
    deleted: {
      type: "boolean",
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

export type Message = {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted: boolean;
};
