import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  route as dashboardRoute,
  DashboardPage,
} from '../pages/PrivateLayout/DashboardPage';
import {
  route as bettingRoute,
  BettingPage,
} from '../pages/PrivateLayout/BettingPage';
import { PrivateNavbar } from '../pages/PrivateLayout/PrivateNavbar';
import { logoutUser } from '../services/auth/api';

export const PrivateLayout: React.FC = () => {
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
