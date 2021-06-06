import { createApiCall } from '../api/api';
import { transformCountry, transformCovidData } from './transformations';

export const fetchCovidData = async () => {
  const resp = await createApiCall({
    url: '/CovidData/history',
    method: 'GET',
  })();

  return resp.data.map(transformCovidData);
};

export const fetchCountries = async () => {
  const resp = await createApiCall({
    url: '/CovidData/countries',
    method: 'GET',
  })();

  return resp.data.map(transformCountry);
};
