import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { Header } from '../../../common/components/Header';
import { Modal } from '../../../common/components/Modal';
import { Page } from '../../../common/components/Page';
import { Table } from '../../../common/components/Table';
import { TextFieldVertical } from '../../../common/components/TextFieldVertical';
import { fetchBets } from '../../../services/bets/api';
import { Bet } from '../../../services/bets/types';
import {
  addToFavourite,
  fetchFavouritesLeaderboard,
  fetchLeaderboard,
} from '../../../services/leaderboard/api';
import { Leaderboard } from '../../../services/leaderboard/types';
import { useGlobalContext } from '../../../services/providers/GlobalProvider';
import { BettingViewTable } from './BettingViewModal';

export const LeaderboardPage: React.FC = () => {
  const { countries, activeUser } = useGlobalContext();

  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [favorites, setFavorites] = useState<Leaderboard[]>([]);
  const [activeLeaderboardUserId, setActiveUserId] = useState<number | null>(0);
  const [search, setSearch] = useState<string>('');

  const isActiveUser = useMemo(
    () => activeLeaderboardUserId === activeUser.id,
    [activeLeaderboardUserId, activeUser.id]
  );

  useEffect(() => {
    (async () => {
      try {
        const leaderboardData = await fetchLeaderboard();
        const favoritesLeaderboardData = await fetchFavouritesLeaderboard();
        setLeaderboard(leaderboardData);
        setFavorites(favoritesLeaderboardData);
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

  const handleSearchChange = useCallback(
    (e: any) => setSearch(e.target.value),
    []
  );

  const handleRowClicked = useCallback((row: Leaderboard) => {
    setActiveUserId(row.userId);
  }, []);

  const handleAddToFavouriteClicked = useCallback(async () => {
    if (!activeUser.id || !activeLeaderboardUserId) {
      return;
    }
    try {
      await addToFavourite(activeUser.id, activeLeaderboardUserId);
      var favouritesData = await fetchFavouritesLeaderboard();
      setFavorites(favouritesData);
      setActiveUserId(null);
    } catch (e) {
      // ignore error
    }
  }, [activeLeaderboardUserId, activeUser.id]);

  return (
    <Page>
      <Header title="Leaderboard" />
      <Form.Control
        style={{ width: '50%', marginBottom: '10px' }}
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        columns={columns(renderCountryColumn)}
        data={leaderboard}
        onRowClick={handleRowClicked}
        globalFilterValue={search}
        pagination
      />
      <Header title="Favourites" />
      <Table
        columns={columns(renderCountryColumn)}
        data={favorites}
        pagination
      />
      <Modal
        show={!!activeLeaderboardUserId}
        onClose={() => setActiveUserId(null)}
        className="modal-lg"
        saveButtonDialog="Add user to favourites"
        onSave={isActiveUser ? undefined : handleAddToFavouriteClicked}
        title={'Bets'}
      >
        <BettingViewTable userId={activeLeaderboardUserId} />
      </Modal>
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
