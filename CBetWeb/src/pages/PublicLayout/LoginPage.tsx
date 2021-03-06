import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Navbar,
  Row,
} from 'react-bootstrap';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { LoginForm } from './types';
import { yupLoginSchema } from './validations';
import { initialFormLogin } from './consts';
import { googleSignIn, validateUser } from '../../services/auth/api';
import { useGlobalContext } from '../../services/providers/GlobalProvider';
import { setAccessToken } from '../../services/auth/services';
import { TextFieldVertical } from '../../common/components/TextFieldVertical';
import GoogleLogin from 'react-google-login';
import toast from 'react-hot-toast';

export const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(yupLoginSchema),
  });

  const { setActiveUser } = useGlobalContext();
  const responseGoogle = async (
    response: GoogleLoginResponseOffline | GoogleLoginResponse
  ) => {
    if (response.code) {
      toast.error('Login Error');
    }
    try {
      const user = await googleSignIn(response as GoogleLoginResponse);
      setActiveUser(user);
      setAccessToken(user.token || '');
    } catch (e) {
      // ignore error
    }
  };
  useEffect(() => {
    reset(initialFormLogin);
  }, [reset]);

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = await validateUser(data);
      setActiveUser(user);
      setAccessToken(user.token || '');
    } catch {
      // ignore error
    }
  };

  return (
    <>
      <Form
        id="form"
        style={{ width: '100%' }}
        onSubmit={handleSubmit(onSubmit)}
        className="form"
      >
        <Container className="loginPage">
          <Navbar className="navBar" sticky="top" expand="lg">
            <Navbar.Brand href="/">
              <img
                style={{ marginRight: '10px' }}
                width="45"
                height="45"
                alt="logo"
                src="/logo.png"
              />
              CBet
            </Navbar.Brand>
          </Navbar>
          <Row
            style={{ width: '100%', margin: 'auto', justifyContent: 'center' }}
          >
            <Col xs={12} md={8} lg={6}>
              <Card className="loginCard">
                <Card.Body>
                  <h4>Log In</h4>
                  <TextFieldVertical
                    name={'email'}
                    placeholder="Email"
                    className="loginInput"
                    control={control}
                    error={!!errors.email}
                  />
                  <TextFieldVertical
                    name={'password'}
                    placeholder="Password"
                    control={control}
                    type="password"
                    className="loginInput"
                    error={!!errors.password}
                  />
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      style={{ height: '43px', width: '95px' }}
                      type="submit"
                    >
                      Login
                    </Button>
                    <GoogleLogin
                      clientId="1021556519319-5p5njbpduoef09teftaft7tfifsck326.apps.googleusercontent.com"
                      buttonText="Login With Google"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export const route = '/login';
