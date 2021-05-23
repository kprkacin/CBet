import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  route as landingRoute,
  LandingPage,
} from '../pages/PublicLayout/LandingPage';
import {
  route as loginRoute,
  LoginPage,
} from '../pages/PublicLayout/LoginPage';
import {
  route as registerRoute,
  RegisterPage,
} from '../pages/PublicLayout/RegisterPage';

export const PublicLayout: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Switch>
          <Route exact path={loginRoute} component={LoginPage} />
          <Route exact path={registerRoute} component={RegisterPage} />
          <Route path={landingRoute} component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
