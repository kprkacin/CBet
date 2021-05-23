import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { LoginForm } from './types';
import { yupLoginSchema } from './validations';
import { initialFormLogin } from './consts';
import { validateUser } from '../../services/auth/api';
import { useGlobalContext } from '../../services/providers/GlobalProvider';
import { TextField } from '../../common/components/TextField';
import { setAccessToken } from '../../services/auth/services';
import { TextFieldVertical } from '../../common/components/TextFieldVertical';

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
        <Container fluid className="loginPage">
          <Row style={{ width: '35%', margin: 'auto' }}>
            <Col xs={12}>
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
                    className="loginInput"
                    error={!!errors.password}
                  />
                  <Button type="submit">Login</Button>
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
