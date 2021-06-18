import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../../common/components/Header';
import { Page } from '../../common/components/Page';
import { Table } from '../../common/components/Table';
import { fetchBets } from '../../services/bets/api';
import { Bet } from '../../services/bets/types';
import { fetchLeaderboard } from '../../services/leaderboard/api';
import { Leaderboard } from '../../services/leaderboard/types';
import { useGlobalContext } from '../../services/providers/GlobalProvider';

export const LeaderboardPage: React.FC = () => {
  const { countries } = useGlobalContext();

  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
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
    <Page>
      <Header title="Leaderboard Page" />
      <Table
        columns={columns(renderCountryColumn)}
        data={leaderboard}
        pagination
      />
    </Page>
  );
};

export const route = '/leaderboard';

const columns: any = (renderCountryColumn: (id: number) => JSX.Element) => {
  return [
    {
      Header: '',
      accessor: 'rank',
      Cell: (e: any) => {
        console.log(e.row);
        switch (e.row.index) {
          case 0:
            return (
              <img
                style={{ marginRight: '10px' }}
                width="35"
                height="35"
                alt="gold"
                src="/crowngold.png"
              />
            );
          case 1:
            return (
              <img
                style={{ marginRight: '10px' }}
                width="35"
                height="35"
                alt="silver"
                src="/crownsilver.png"
              />
            );
          case 2:
            return (
              <img
                style={{ marginRight: '10px' }}
                width="35"
                height="35"
                alt="bronze"
                src="/crownbronze.png"
              />
            );
          default:
            return <></>;
        }
      },
    },
    {
      Header: 'Username',
      accessor: 'username',
    },
    {
      Header: 'Country',
      accessor: 'countryId',
      Cell: (e: any) => renderCountryColumn(e.cell.row.original.countryId),
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
