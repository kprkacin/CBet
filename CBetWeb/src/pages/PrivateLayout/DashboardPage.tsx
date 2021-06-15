import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { MapSection } from './DashboardPage/MapSection';
import { NewsSection } from './DashboardPage/NewsSection';

export const DashboardPage: React.FC = () => {
  return (
    <div className="dashboardPage">
      <MapSection />
      <NewsSection />
    </div>
  );
};

export const route = '/';
