import React from 'react';
import { Toaster } from 'react-hot-toast';

import { PublicLayout } from './layouts/PublicLayout';
import { useGlobalContext } from './services/providers/GlobalProvider';
import './styles/style.scss';

function App() {
  const globalContext = useGlobalContext();

  return (
    <>
      <Toaster position="top-right" />
      {<PublicLayout />}
    </>
  );
}

export default App;
