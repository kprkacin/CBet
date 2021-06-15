import { createApiCall } from '../api/api';
import { tranformNews } from './transformations';

export const fetchNews = async () => {
  const resp = await createApiCall({
    method: 'GET',
    url: 'https://free-news.p.rapidapi.com/v1/search',
    params: { q: 'Coronavirus', lang: 'en' },
    headers: {
      'x-rapidapi-key': 'e8c5a93cecmsh14f6c354c9f242ap14f2b4jsn0272dc1af4fc',
      'x-rapidapi-host': 'free-news.p.rapidapi.com',
    },
  })();

  return resp.data.articles.map(tranformNews);
};
