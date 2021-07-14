import { Leaderboard } from './types';

export const transformLeaderboard = (res: any): Leaderboard => {
  return {
    email: res.email,
    username: res.username,
    successfulBets: res.successfulBets,
    winAmount: res.winAmount,
    betAmount: res.betAmount,
    countryId: res.countryId,
    userId: res.id,
  };
};
