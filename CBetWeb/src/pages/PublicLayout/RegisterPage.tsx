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

import { RegisterForm } from './types';
import { yupRegisterSchema } from './validations';
import { initialFormLogin } from './consts';
import { createUser } from '../../services/auth/api';
import { useGlobalContext } from '../../services/providers/GlobalProvider';
import { setAccessToken } from '../../services/auth/services';
import { TextFieldVertical } from '../../common/components/TextFieldVertical';
import { SelectFieldVertical } from '../../common/components/SelectFieldVertical';
import { Country } from '../../services/covidData/types';

export const RegisterPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(yupRegisterSchema),
  });

  const { setActiveUser, countries } = useGlobalContext();

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
            <Col xs={12} lg={4}>
              <Card className="loginCard">
                <Card.Body>
                  <h4>Register</h4>
                  <TextFieldVertical
                    name={'firstName'}
                    placeholder="First Name"
                    className="loginInput"
                    control={control}
                    error={!!errors.firstName}
                  />
                  <TextFieldVertical
                    name={'lastName'}
                    placeholder="Last Name"
                    className="loginInput"
                    control={control}
                    error={!!errors.lastName}
                  />
                  <TextFieldVertical
                    name={'username'}
                    placeholder="Username"
                    className="loginInput"
                    control={control}
                    error={!!errors.username}
                  />
                  <TextFieldVertical
                    name={'email'}
                    placeholder="Email"
                    className="loginInput"
                    control={control}
                    error={!!errors.email}
                  />
                  <TextFieldVertical
                    name={'phone'}
                    placeholder="Phone"
                    className="loginInput"
                    control={control}
                    error={!!errors.phone}
                  />
                  <SelectFieldVertical
                    options={countries}
                    getOption={(opt: Country) => opt.name || ''}
                    name={'country'}
                    placeholder="Country"
                    control={control}
                    error={!!errors.country}
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
