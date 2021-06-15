import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../../common/components/Header';
import { Table } from '../../common/components/Table';
import { fetchBets } from '../../services/bets/api';
import { Bet } from '../../services/bets/types';
import { fetchLeaderboard } from '../../services/leaderboard/api';
import { useGlobalContext } from '../../services/providers/GlobalProvider';

export const LeaderboardPage: React.FC = () => {
  const { countries } = useGlobalContext();

  const [leaderboard, setLeaderboard] = useState<Bet[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const leaderboardData = await fetchLeaderboard();
        setLeaderboard(leaderboardData);
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

  return (
    <div className="landingPage">
      <Header title="Leaderboard Page" />
      <Table
        columns={columns(renderCountryColumn)}
        data={leaderboard}
        pagination
      />
    </div>
  );
};

export const route = '/leaderboard';

const columns: any = (renderCountryColumn: (id: number) => JSX.Element) => {
  return [
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Username',
      accessor: 'username',
    },
    {
      Header: 'Successful Bets',
      accessor: 'successfulBets',
    },
    {
      Header: 'Amount Bet',
      accessor: 'betAmount',
    },
    {
      Header: 'Amount Won',
      accessor: 'winAmount',
    },
  ];
};
