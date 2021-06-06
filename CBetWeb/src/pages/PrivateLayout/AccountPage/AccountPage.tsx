import React, { useEffect, useState, useCallback } from 'react';
import { Container, Col, Row, Card, ListGroup } from 'react-bootstrap';
import { Header } from '../../../common/components/Header';
import { Icon } from '../../../common/components/Icon';
import { IconButton } from '../../../common/components/IconButton';
import { Page } from '../../../common/components/Page';
import { useGlobalContext } from '../../../services/providers/GlobalProvider';
import { updateUser } from '../../../services/users/api';
import { User } from '../../../services/users/types';
import { EditAccountModal } from './EditAccountModal';

export const AccountPage: React.FC = () => {
  const { activeUser, setActiveUser } = useGlobalContext();

  const [showEditAccountModal, setEditAccountModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onAction = () => setEditAccountModal(true);

  const closeEditAccountModal = () => setEditAccountModal(false);

  const handleSaveEditAccountModal = useCallback(
    async (user: User) => {
      try {
        setIsLoading(true);
        const updatedUser = await updateUser(user);
        setActiveUser((old) => ({ ...updatedUser, token: old.token }));
      } catch {
        // ignore error
      }
      setEditAccountModal(false);
      setIsLoading(false);
    },
    [setActiveUser]
  );

  return (
    <Page isLoading={isLoading}>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Header
              title={`${activeUser.username || ''}`}
              action={
                <IconButton
                  icon={<Icon name="add_circle" color="primary" />}
                  title="Edit Account"
                  onClick={onAction}
                />
              }
            />
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={12}>
                    <ListGroup variant="flush" className="card__list">
                      <ListGroup.Item>
                        <div className="label">Name</div>
                        <div className="value">{`${activeUser.firstName} ${activeUser.lastName}`}</div>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <div className="label">Email</div>
                        <div className="value">{`${activeUser.email} ${activeUser.email}`}</div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <EditAccountModal
        title={'Edit Profile'}
        showEditAccountModal={showEditAccountModal}
        user={activeUser}
        onClose={closeEditAccountModal}
        onSave={handleSaveEditAccountModal}
      />
    </Page>
  );
};

export const route = '/account';
