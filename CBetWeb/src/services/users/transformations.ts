import { User } from './types';

export const transformUser = (res: any): User => {
  return {
    firstName: res.firstName,
    lastName: res.lastName,
    username: res.username,
    email: res.email,
    token: res.token,
  };
};
