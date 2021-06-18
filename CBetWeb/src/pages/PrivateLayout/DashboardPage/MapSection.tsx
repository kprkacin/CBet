import { Grid } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, Jumbotron } from 'react-bootstrap';
import { WorldMap } from 'react-svg-worldmap';
import { array } from 'yup';
import { fetchNews } from '../../../services/news/api';
import { News } from '../../../services/news/types';
import { useGlobalContext } from '../../../services/providers/GlobalProvider';

export const MapSection: React.FC = () => {
  const { countries, covidData } = useGlobalContext();

  const data = covidData.map((cd) => {
    if (cd.countryCode == 'GL') {
      return { country: '', value: 0 };
    }
    return {
      country: cd.countryCode || '',
      value: cd.avg || 0,
    };
  });

  return (
    <div style={{ marginLeft: '5%' }}>
      <WorldMap
        color="red"
        value-suffix="people"
        backgroundColor="inherit"
        size="xxl"
        data={data}
      />
    </div>
  );
};
