import React, { useMemo, useState, useCallback } from 'react';
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
  const { activeUser, countries, setActiveUser } = useGlobalContext();

  const [showEditAccountModal, setEditAccountModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userCountry = useMemo(
    () => countries.find((c) => c.id === activeUser.countryId),
    [activeUser.countryId, countries]
  );

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
        <Row style={{ justifyContent: 'center' }}>
          <Col xs={12} lg={6}>
            <Header
              title={`${activeUser.username || ''}`}
              action={
                <IconButton
                  icon={<Icon name="add_circle" color="primary" />}
                  title="Edit Account"
                  disabled={activeUser.thirdParty}
                  onClick={onAction}
                />
              }
            />

            <Card>
              <Card.Body>
                <ListGroup variant="flush" className="card__list">
                  <ListGroup.Item>
                    <div className="label">First Name</div>
                    <div className="value">{activeUser.firstName}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Last Name</div>
                    <div className="value">{activeUser.lastName}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Email</div>
                    <div className="value">{activeUser.email}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Phone</div>
                    <div className="value">{activeUser.phoneNumber}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Country</div>
                    <div className="value">{userCountry?.name}</div>
                  </ListGroup.Item>
                </ListGroup>
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
