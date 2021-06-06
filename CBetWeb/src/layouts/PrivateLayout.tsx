import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  route as dashboardRoute,
  DashboardPage,
} from '../pages/PrivateLayout/DashboardPage';
import {
  route as bettingRoute,
  BettingPage,
} from '../pages/PrivateLayout/BettingPage/BettingPage';
import { PrivateNavbar } from '../pages/PrivateLayout/PrivateNavbar';
import { fetchCovidData, fetchCountries } from '../services/covidData/api';
import { useGlobalContext } from '../services/providers/GlobalProvider';

export const PrivateLayout: React.FC = () => {
  const { setCountries, setCovidData } = useGlobalContext();

  useEffect(() => {
    (async () => {
      try {
        const covidData = await fetchCovidData();
        const countries = await fetchCountries();
        setCountries(countries);
        setCovidData(covidData);
      } catch {
        // ignore
      }
    })();
  }, [setCountries, setCovidData]);

  return (
    <BrowserRouter>
      <div className="privateWrapper">
        <PrivateNavbar />
        <Switch>
          <Route exact path={bettingRoute} component={BettingPage} />
          <Route path={dashboardRoute} component={DashboardPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
