// arango document: Users

export const UsersSchema = {
  name: "Users",
  fields: {
    id: {
      type: "number",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    avatar: {
      type: "string",
      required: true,
    },
    created_at: {
      type: "date",
      required: true,
    },
    online: {
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
    {
      type: "hash",
      fields: ["email"],

      unique: true,
    },
  ],
};

export type Users = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  created_at: Date;
  online: boolean;
};
