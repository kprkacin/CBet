import { GoogleLoginResponse } from 'react-google-login';
import { RegisterForm } from '../../pages/PublicLayout/types';
import { User } from './types';

export const transformUser = (res: any): User => {
  return {
    firstName: res.firstName,
    lastName: res.lastName,
    username: res.username,
    email: res.email,
    countryId: res.countryId,
    phoneNumber: res.phoneNumber,
    token: res.token,
    thirdParty: res.thirdParty,
    id: res.id,
  };
};
export const transformToPatchUser = (user: User): any => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    countryId: user.countryId,
    phonenumber: user.phoneNumber,
  };
};
export const transformToCreateUser = (form: RegisterForm): any => {
  return {
    firstName: form.firstName,
    lastName: form.lastName,
    username: form.username,
    email: form.email,
    password: form.password,
    phonenumber: form.phone,
    countryId: form.country?.id,
  };
};
export const transformToGoogleUser = (form: GoogleLoginResponse): any => {
  return {
    firstName: form.profileObj.givenName || '',
    lastName: form.profileObj.familyName || '',
    email: form.profileObj.email || '',
  };
};
