import React from 'react';

import { Header } from '../../common/components/Header';
import { Page } from '../../common/components/Page';
import { MapSection } from './DashboardPage/MapSection';
import { NewsSection } from './DashboardPage/NewsSection';

export const DashboardPage: React.FC = () => {
  return (
    <Page>
      <Header title="Average Cases Last Week" />
      <MapSection />
      <Header title="Latest News" />
      <NewsSection />
    </Page>
  );
};

export const route = '/';
