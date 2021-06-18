import { dateToFormatedString } from './helpers';
import { Bet } from './types';

export const transformBet = (res: any): Bet => {
  return {
    id: res.id,
    amount: res.amount,
    value: res.value,
    countryId: res.countryId,
    country: null,
    coefficient: res.coeficient,
    createdAt: res.createdAt ? dateToFormatedString(res.createdAt) : null,
    payoutAt: res.payoutAt ? dateToFormatedString(res.payoutAt) : null,
    payout: res.payout,
    status: res.type,
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
