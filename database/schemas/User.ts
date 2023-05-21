export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  created_at: Date;
  online: boolean;
};

export const orderUser = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    password: user.password,
    created_at: user.created_at,
    online: user.online,
  };
};
