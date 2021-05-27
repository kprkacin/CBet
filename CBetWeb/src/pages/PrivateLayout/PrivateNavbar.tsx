import React, { useCallback } from 'react';
import {
  Button,
  Card,
  Container,
  Jumbotron,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutUser } from '../../services/auth/api';

export const PrivateNavbar: React.FC = () => {
  const history = useHistory();
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
    <Navbar sticky="top" expand="lg">
      <Navbar.Brand onClick={() => redirect('/dashboard')}>CBet</Navbar.Brand>
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
          <Nav.Link onClick={() => {}}>Account</Nav.Link>
          <Nav.Link onClick={() => onLogoutClicked()}>Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
