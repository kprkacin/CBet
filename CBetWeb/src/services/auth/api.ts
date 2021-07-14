import {
  transformToCreateUser,
  transformToGoogleUser,
  transformUser,
} from '../users/transformations';
import { LoginForm, RegisterForm } from '../../pages/PublicLayout/types';
import { createApiCall } from '../api/api';

import { clearAccessToken } from './services';
import { GoogleLoginResponse } from 'react-google-login';

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
export const googleSignIn = async (options: GoogleLoginResponse) => {
  const resp = await createApiCall(
    {
      url: '/Auth/google',
      method: 'POST',
      data: transformToGoogleUser(options),
    },
    {
      success: 'User successfully logged in',
    }
  )();

  return transformUser(resp.data);
};

export const logoutUser = () => {
  // TODO: Add logout api call
  clearAccessToken();
};
