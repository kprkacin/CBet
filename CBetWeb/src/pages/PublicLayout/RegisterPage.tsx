import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import { RegisterForm } from './types';
import { yupLoginSchema } from './validations';
import { initialFormLogin } from './consts';
import { createUser } from '../../services/auth/api';
import { useGlobalContext } from '../../services/providers/GlobalProvider';
import { setAccessToken } from '../../services/auth/services';
import { TextFieldVertical } from '../../common/components/TextFieldVertical';

export const RegisterPage: React.FC = () => {
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

  const onSubmit = async (data: RegisterForm) => {
    try {
      const user = await createUser(data);
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
                  <h4>Register</h4>
                  <TextFieldVertical
                    name={'firstName'}
                    placeholder="First Name"
                    className="loginInput"
                    control={control}
                    error={!!errors.email}
                  />
                  <TextFieldVertical
                    name={'lastName'}
                    placeholder="Last Name"
                    className="loginInput"
                    control={control}
                    error={!!errors.email}
                  />
                  <TextFieldVertical
                    name={'username'}
                    placeholder="Username"
                    className="loginInput"
                    control={control}
                    error={!!errors.email}
                  />
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
                  <Button type="submit">Register</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export const route = '/register';
