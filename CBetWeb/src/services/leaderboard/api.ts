import { createApiCall } from '../api/api';
import { transformLeaderboard } from './transformations';

export const fetchLeaderboard = async () => {
  const resp = await createApiCall({
    url: '/Leaderboard',
    method: 'GET',
  })();

  return resp.data.map(transformLeaderboard);
};

export const fetchFavouritesLeaderboard = async () => {
  const resp = await createApiCall({
    url: '/Favorites/leaderboard',
    method: 'GET',
  })();

  return resp.data.map(transformLeaderboard);
};

export const addToFavourite = async (
  userId: number,
  favoritedUserId: number
) => {
  await createApiCall(
    {
      url: '/Favorites',
      method: 'POST',
      data: {
        favoritedUserId,
        userId,
      },
    },
    {
      success: 'User added to favorites',
    }
  )();
};
