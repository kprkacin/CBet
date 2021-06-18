import React, { useCallback, useMemo, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Modal } from '../../../common/components/Modal';

import { SelectField } from '../../../common/components/SelectField';
import { TextField } from '../../../common/components/TextField';
import { useGlobalContext } from '../../../services/providers/GlobalProvider';
import { updatePassword } from '../../../services/users/api';
import { initialUser } from '../../../services/users/consts';
import { User } from '../../../services/users/types';

export const EditAccountModal: React.FC<EditAccountModalProps> = (props) => {
  const { title, showEditAccountModal, user, onClose, onSave } = props;

  const { countries } = useGlobalContext();

  const { control, handleSubmit, watch, reset, setValue, formState } =
    useForm();

  const { isDirty } = formState;

  const { newPassword, confirmNewPassword, oldPassword } = watch();

  const passwordMatch = useMemo(
    () =>
      newPassword || confirmNewPassword
        ? newPassword === confirmNewPassword
        : true,
    [newPassword, confirmNewPassword]
  );

  useEffect(() => {
    reset(user);
    var country = countries.find((c) => c.id === user.countryId);
    if (country) {
      setValue('country', country);
    }
  }, [user, countries, reset]);

  const onSubmit = (data: any) => {
    if (!isDirty) {
      onClose();
      return;
    }
    if (onSave) {
      onSave({
        ...initialUser,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        countryId: data.country.id,
      });
    }
    onClose();
  };

  const handleUpdatePasswordClicked = useCallback(() => {
    if (user.token && passwordMatch && newPassword && oldPassword) {
      try {
        updatePassword(oldPassword, newPassword);
      } catch {
        // ignore error
      }
    }
  }, [user.token, passwordMatch, oldPassword, newPassword]);

  const handleModalClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return (
    <Modal
      show={showEditAccountModal}
      onClose={handleModalClose}
      form="profileForm"
      className="modal-lg"
      title={title}
      onSave={() => {}}
    >
      <Form id="profileForm" onSubmit={handleSubmit(onSubmit)} className="form">
        <Container fluid>
          <Row>
            <Col>
              <h4>Details</h4>
              <TextField
                name="firstName"
                placeholder="First Name"
                control={control}
                label="First Name"
                as={Row}
              />
              <TextField
                name="lastName"
                placeholder="Contact"
                control={control}
                label="Last Name"
                as={Row}
              />
              <TextField
                name="email"
                placeholder="Email"
                control={control}
                label="Email"
                as={Row}
              />
              <TextField
                name="username"
                placeholder="Username"
                control={control}
                label="Username"
                as={Row}
              />
              <SelectField
                options={countries}
                name="country"
                getOption={(c) => c.name}
                placeholder="Country"
                control={control}
                label="Country"
                as={Row}
              />
            </Col>
          </Row>
          <Row className="customModalRow">
            <Col>
              <h4>Password</h4>
              <TextField
                name="oldPassword"
                placeholder="Old Password"
                control={control}
                label="Old Password"
                type="password"
                as={Row}
              />
              <TextField
                name="newPassword"
                placeholder="New Password"
                control={control}
                label="New Password"
                error={!passwordMatch}
                type="password"
                as={Row}
              />
              <TextField
                name="confirmNewPassword"
                placeholder="Confirm new password"
                control={control}
                label="Confirm new password"
                type="password"
                error={!passwordMatch}
                errorMessage={
                  !passwordMatch ? 'Passwords do not match' : undefined
                }
                as={Row}
              />
            </Col>
          </Row>
          <Row>
            <Col className="modalFooterRow">
              <Link to="#">Forgot password?</Link>
              <button
                className="roundButton"
                form=""
                onClick={handleUpdatePasswordClicked}
              >
                Update Password
              </button>
            </Col>
          </Row>
        </Container>
      </Form>
    </Modal>
  );
};

export interface EditAccountModalProps {
  title: string;
  showEditAccountModal: boolean;
  user: User;
  onClose(): void;
  onSave?(user: User): void;
}
