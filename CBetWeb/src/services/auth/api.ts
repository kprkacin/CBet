import { transformToCreateUser, transformUser } from '../users/transformations';
import { LoginForm, RegisterForm } from '../../pages/PublicLayout/types';
import { createApiCall } from '../api/api';

import { clearAccessToken } from './services';

export const validateUser = async (login: LoginForm) => {
  const resp = await createApiCall(
    {
      url: '/Auth/login',
      method: 'POST',
      data: login,
    },
    {
      success: 'Logged in successfully',
    }
  )();

  return transformUser(resp.data);
};

export const createUser = async (register: RegisterForm) => {
  const resp = await createApiCall(
    {
      url: '/User/register',
      method: 'POST',
      data: transformToCreateUser(register),
    },
    {
      success: 'User successfully registered',
    }
  )();

  return transformUser(resp.data);
};

export const logoutUser = () => {
  // TODO: Add logout api call
  clearAccessToken();
};
