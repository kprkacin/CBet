import { createApiCall } from '../api/api';
import { transformBet, transformToRequestBet } from './transformations';

export const fetchBets = async () => {
  const resp = await createApiCall({
    url: '/Bet',
    method: 'GET',
  })();

  return resp.data.map(transformBet);
};

export const fetchBetsByUser = async (userId: number) => {
  const resp = await createApiCall({
    url: '/Bet/by-user',
    method: 'GET',
    params: { userId: userId },
  })();

  return resp.data.map(transformBet);
};

export const createBet = async (data: any) => {
  const resp = await createApiCall(
    {
      url: '/Bet',
      method: 'POST',
      data: transformToRequestBet(data),
    },
    {
      success: 'Bet successfully created',
    }
  )();

  return transformBet(resp.data);
};
