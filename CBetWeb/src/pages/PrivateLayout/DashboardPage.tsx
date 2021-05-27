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
import { useHistory } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  return (
    <div className="landingPage">
      <Jumbotron className="landingJumbo" fluid>
        <h1>CBet online DASHBOARD</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <Button>Try it out!</Button>
      </Jumbotron>
    </div>
  );
};

export const route = '/';
