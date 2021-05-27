import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { PrivateLayout } from './layouts/PrivateLayout';

import { PublicLayout } from './layouts/PublicLayout';
import { api } from './services/api/api';
import { getAccessToken } from './services/auth/services';
import { fetchCountries, fetchCovidData } from './services/covidData/api';
import { useGlobalContext } from './services/providers/GlobalProvider';
import './styles/style.scss';

function App() {
  const { activeUser, setCountries, setCovidData } = useGlobalContext();

  const accessToken = getAccessToken();
  if (accessToken) {
    api.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
  }

  useEffect(() => {
    const func = async () => {
      try {
        const covidData = await fetchCovidData();
        const countries = await fetchCountries();
        setCountries(countries);
        setCovidData(covidData);
      } catch {
        // ignore
      }
    };
    if (activeUser.token) {
      func();
    }
  }, [activeUser.token, setCountries, setCovidData]);

  return (
    <>
      <Toaster position="top-right" />
      {activeUser.token ? <PrivateLayout /> : <PublicLayout />}
    </>
  );
}

export default App;
