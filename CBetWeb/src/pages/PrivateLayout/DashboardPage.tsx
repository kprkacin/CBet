import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

export const DashboardPage: React.FC = () => {
  return (
    <div className="landingPage">
      <Jumbotron className="landingJumbo" fluid>
        <img alt="banner" src="/logo.png"></img>
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
