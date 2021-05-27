import { Country } from '../covidData/types';

export interface Bet {
  amount: number | null;
  value: number | null;
  country: Country | null;
  countryId: number | null;
  coefficient: number | null;
}
