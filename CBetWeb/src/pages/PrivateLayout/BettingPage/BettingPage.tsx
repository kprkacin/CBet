import React, { useState, useEffect, useCallback } from 'react';

import { Header } from '../../../common/components/Header';
import { Icon } from '../../../common/components/Icon';
import { IconButton } from '../../../common/components/IconButton';
import { Modal } from '../../../common/components/Modal';
import { Table } from '../../../common/components/Table';
import { fetchBets } from '../../../services/bets/api';
import { Bet } from '../../../services/bets/types';
import { useGlobalContext } from '../../../services/providers/GlobalProvider';
import { BettingFormModal } from './components/BettingModal';

export const BettingPage: React.FC = () => {
  const { countries } = useGlobalContext();

  const [bets, setBets] = useState<Bet[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const betsData = await fetchBets();
        setBets(betsData);
      } catch (e) {
        //ignore error
      }
    })();
  }, []);

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

  const onBetSave = useCallback(async () => {
    try {
      const betsData = await fetchBets();
      setBets(betsData);
    } catch (e) {
      //ignore error
    }
    setShowModal(false);
  }, []);

  return (
    <div className="landingPage">
      <Header
        title="Betting Page"
        action={
          <IconButton
            icon={<Icon name="add_circle" color="primary" />}
            title="New Bet"
            onClick={() => setShowModal(true)}
          />
        }
      />
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        className="modal-xl"
      >
        <BettingFormModal onSave={onBetSave} />
      </Modal>

      <Table columns={columns(renderCountryColumn)} data={bets} pagination />
    </div>
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
