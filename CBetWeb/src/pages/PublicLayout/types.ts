import { Country } from '../../services/covidData/types';

export interface LoginForm {
  email: string;
  password: string;
}
export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  country: Country | null;
}
