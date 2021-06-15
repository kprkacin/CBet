import { createApiCall } from '../api/api';
import { transformLeaderboard } from './transformations';

export const fetchLeaderboard = async () => {
  const resp = await createApiCall({
    url: '/Leaderboard',
    method: 'GET',
  })();

  return resp.data.map(transformLeaderboard);
};
