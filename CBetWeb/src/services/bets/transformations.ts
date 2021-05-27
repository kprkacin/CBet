import { Bet } from './types';

export const transformBet = (res: any): Bet => {
  return {
    amount: res.amount,
    value: res.value,
    countryId: res.countryId,
    country: null,
    coefficient: res.coefficient,
  };
};

export const transformToRequestBet = (res: Bet): any => {
  return {
    amount: res.amount,
    value: res.value,
    countryId: res.country?.id,
    coeficient: res.coefficient,
  };
};
