import { getAccessToken } from '../auth/services';
import { User } from './types';

export const initialUser: User = {
  id: null,
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  countryId: null,
  phoneNumber: null,
  thirdParty: false,
  token: getAccessToken(),
};
