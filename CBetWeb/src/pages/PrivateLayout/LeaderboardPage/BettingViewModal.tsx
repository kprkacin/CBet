import { IconButton, Icon } from '@material-ui/core';
import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Header } from '../../../common/components/Header';
import { Modal } from '../../../common/components/Modal';

import { SelectField } from '../../../common/components/SelectField';
import { Table } from '../../../common/components/Table';
import { TextField } from '../../../common/components/TextField';
import { fetchBetsByUser } from '../../../services/bets/api';
import { Bet } from '../../../services/bets/types';
import { useGlobalContext } from '../../../services/providers/GlobalProvider';
import { updatePassword } from '../../../services/users/api';
import { initialUser } from '../../../services/users/consts';
import { User } from '../../../services/users/types';
import { BettingFormModal } from '../BettingPage/components/BettingModal';

export const BettingViewTable: React.FC<BettingViewTableProps> = (props) => {
  const { userId } = props;
  const { countries } = useGlobalContext();

  const [bets, setBets] = useState<Bet[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!userId) {
        return;
      }
      try {
        const betsData = await fetchBetsByUser(userId);
        setBets(betsData);
      } catch (e) {
        //ignore error
      }
    })();
  }, [userId]);

  const renderCountryColumn = useCallback(
    (id: number) => {
      const country = countries.find((c) => c.id === id);

      if (!country) {
        return <></>;
      }
      return <>{country.name}</>;
    },
    [countries]
  );

  return (
    <Table columns={columns(renderCountryColumn)} data={bets} pagination />
  );
};

export const route = '/betting';

const columns: any = (renderCountryColumn: (id: number) => JSX.Element) => {
  return [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Value',
      accessor: 'value',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Coefficient',
      accessor: 'coefficient',
    },
    {
      Header: 'Payout',
      accessor: 'payout',
    },
    {
      Header: 'Country',
      Cell: (e: any) => renderCountryColumn(e.cell.row.original.countryId),
    },
    {
      Header: 'Date Created',
      accessor: 'createdAt',
    },
    {
      Header: 'Payout Date',
      accessor: 'payoutAt',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];
};

export interface BettingViewTableProps {
  userId: number | null;
}
