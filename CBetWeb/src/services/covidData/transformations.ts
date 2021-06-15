import { CovidData, Country } from './types';

export const transformCovidData = (res: any): CovidData => {
  return {
    avg: res.averageLastWeek,
    countryId: res.countryId,
    countryName: res.code,
    todayLastWeek: res.thisDayLastWeek,
    yesterday: res.yesterday,
    countryCode: res.countryISO,
  };
};

export const transformCountry = (res: any): Country => {
  return {
    name: res.name,
    code: res.code,
    id: res.id,
  };
};
