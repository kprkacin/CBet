import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  route as dashboardRoute,
  DashboardPage,
} from '../pages/PrivateLayout/DashboardPage';
import {
  route as leaderboardRoute,
  LeaderboardPage,
} from '../pages/PrivateLayout/LeaderboardPage/LeaderboardPage';
import {
  route as bettingRoute,
  BettingPage,
} from '../pages/PrivateLayout/BettingPage/BettingPage';
import {
  route as accountRoute,
  AccountPage,
} from '../pages/PrivateLayout/AccountPage/AccountPage';
import { PrivateNavbar } from '../pages/PrivateLayout/PrivateNavbar';
import { fetchCovidData, fetchCountries } from '../services/covidData/api';
import { useGlobalContext } from '../services/providers/GlobalProvider';

export const PrivateLayout: React.FC = () => {
  const { setCovidData } = useGlobalContext();

  useEffect(() => {
    (async () => {
      try {
        const covidData = await fetchCovidData();
        setCovidData(covidData);
      } catch {
        // ignore
      }
    })();
  }, [setCovidData]);

  return (
    <BrowserRouter>
      <div className="privateWrapper">
        <div className="innerWrapper">
          <PrivateNavbar />
          <Switch>
            <Route exact path={bettingRoute} component={BettingPage} />
            <Route exact path={leaderboardRoute} component={LeaderboardPage} />
            <Route exact path={accountRoute} component={AccountPage} />
            <Route path={dashboardRoute} component={DashboardPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};
