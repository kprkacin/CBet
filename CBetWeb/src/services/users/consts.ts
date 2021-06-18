import { getAccessToken } from '../auth/services';
import { User } from './types';

export const initialUser: User = {
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  countryId: null,
  phoneNumber: null,
  token: getAccessToken(),
};
