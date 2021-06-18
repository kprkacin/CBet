import { LoginForm, RegisterForm } from './types';

export const initialFormLogin: LoginForm = {
  email: '',
  password: '',
};

export const initialFormRegister: RegisterForm = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  country: null,
  phone: '',
};
