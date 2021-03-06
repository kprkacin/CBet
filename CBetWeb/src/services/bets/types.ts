import { Country } from '../covidData/types';

export interface Bet {
  id: number | null;
  amount: number | null;
  value: number | null;
  country: Country | null;
  countryId: number | null;
  coefficient: number | null;
  createdAt: string | null;
  payoutAt: string | null;
  payout: number | null;
  status: BetStatus;
}

export enum BetStatus {
  Correct = 'Correct',
  False = 'False',
}
