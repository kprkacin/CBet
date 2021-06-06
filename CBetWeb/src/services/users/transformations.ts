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
export const transformToPatchUser = (user: User): any => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  };
};
