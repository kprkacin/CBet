import { createApiCall } from '../api/api';
import { transformToPatchUser, transformUser } from './transformations';
import { User } from './types';

export const fetchActiveUser = async (): Promise<User> => {
  const resp = await createApiCall({
    url: '/User/active',
    method: 'GET',
  })();

  return transformUser(resp.data);
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<User> => {
  const resp = await createApiCall(
    {
      url: '/User/password',
      method: 'PATCH',
      data: {
        oldPassword,
        newPassword,
      },
    },
    {
      success: 'Password updated',
    }
  )();

  return transformUser(resp.data);
};

export const updateUser = async (user: User): Promise<User> => {
  const resp = await createApiCall(
    {
      url: '/User',
      method: 'PATCH',
      data: transformToPatchUser(user),
    },
    {
      success: 'User updated',
    }
  )();

  return transformUser(resp.data);
};
