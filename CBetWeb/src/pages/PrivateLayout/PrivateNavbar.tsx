import React, { useCallback } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Avatar } from '../../common/components/Avatar';
import { logoutUser } from '../../services/auth/api';
import { useGlobalContext } from '../../services/providers/GlobalProvider';

export const PrivateNavbar: React.FC = () => {
  const history = useHistory();
  const { activeUser } = useGlobalContext();

  const onLogoutClicked = useCallback(() => {
    logoutUser();
    window.location.reload();
  }, []);

  const redirect = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history]
  );

  return (
    <Navbar className="navBar" collapseOnSelect sticky="top" expand="lg">
      <Navbar.Brand onClick={() => redirect('/dashboard')}>
        <img
          style={{ marginRight: '10px' }}
          width="45"
          height="45"
          alt="logo"
          src="/logo.png"
        />
        CBet
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="landingNav" id="basic-navbar-nav">
        <Nav>
          <Nav.Link onClick={() => redirect('/betting')}>Betting</Nav.Link>
          <Nav.Link onClick={() => redirect('/leaderboard')}>
            Leaderboard
          </Nav.Link>
        </Nav>
        <Nav
          className="justify-content-end"
          defaultActiveKey="#link"
          variant="pills"
        >
          <Nav.Link onClick={() => redirect('/account')}>
            <Avatar
              firstName={activeUser.firstName}
              lastName={activeUser.lastName}
            />
          </Nav.Link>
          <Nav.Link
            style={{ alignSelf: 'center' }}
            onClick={() => onLogoutClicked()}
          >
            Log Out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
