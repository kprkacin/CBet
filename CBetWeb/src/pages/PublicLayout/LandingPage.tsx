import React, { useCallback } from 'react';
import { Button, Card, Jumbotron, Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const history = useHistory();

  const onSignInClicked = useCallback(() => {
    history.push('/login');
  }, [history]);

  const onSignUpClicked = useCallback(() => {
    history.push('/register');
  }, [history]);

  return (
    <div className="landingPage">
      <Navbar className="navBar" collapseOnSelect sticky="top" expand="lg">
        <Navbar.Brand href="#">
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
            <Nav.Link eventKey="2" href="#features">
              Features
            </Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
          </Nav>
          <Nav
            className="justify-content-end"
            defaultActiveKey="#link"
            variant="pills"
          >
            <Nav.Link onClick={() => onSignInClicked()}>Sign In</Nav.Link>
            <Nav.Link onClick={() => onSignUpClicked()}>Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Jumbotron className="landingJumbo" fluid>
        <h1>CBet online betting</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <Button>Try it out!</Button>
      </Jumbotron>
      <h1 id="features" style={{ textAlign: 'center', marginTop: '150px' }}>
        Features
      </h1>
      <Jumbotron className="landingCardJumbo" fluid>
        <Card className="landingCard" bg="Info">
          <Card.Body>
            <Card.Title>24/7 Online Support </Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="landingCard" bg="Info">
          <Card.Body>
            <Card.Title>24/7 Online Support </Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="landingCard" bg="Info">
          <Card.Body>
            <Card.Title>24/7 Online Support </Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Card.Text>
          </Card.Body>
        </Card>
      </Jumbotron>
      <Jumbotron className="landingJumbo" fluid>
        <h1 id="about">About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Jumbotron>
    </div>
  );
};

export const route = '/';
