import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { PrivateLayout } from './layouts/PrivateLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { api } from './services/api/api';
import { getAccessToken } from './services/auth/services';
import { fetchCountries } from './services/covidData/api';
import { useGlobalContext } from './services/providers/GlobalProvider';
import { fetchActiveUser } from './services/users/api';
import './styles/style.scss';

function App() {
  const { activeUser, setActiveUser, setCountries } = useGlobalContext();

  const accessToken = getAccessToken();
  if (accessToken) {
    api.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
  }

  useEffect(() => {
    (async () => {
      if (accessToken) {
        const user = await fetchActiveUser();
        setActiveUser({ ...user, token: accessToken });
      }
    })();
  }, [accessToken, setActiveUser]);

  useEffect(() => {
    (async () => {
      try {
        const countries = await fetchCountries();
        setCountries(countries);
      } catch {
        // ignore
      }
    })();
  }, [setCountries]);

  return (
    <>
      <Toaster position="top-right" />
      {activeUser.token ? <PrivateLayout /> : <PublicLayout />}
    </>
  );
}

export default App;
