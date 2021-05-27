import React, { ReactNode, useContext, useState } from 'react';

import { initialUser } from '../users/consts';
import { User } from '../users/types';
import { CovidData, Country } from '../covidData/types';

interface GlobalProviderProps {
  children: ReactNode;
}

interface ContextTypes {
  activeUser: User;
  covidData: CovidData[];
  countries: Country[];
  setActiveUser: React.Dispatch<React.SetStateAction<User>>;
  setCovidData: React.Dispatch<React.SetStateAction<CovidData[]>>;
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
}

export const GlobalProviderContext = React.createContext<ContextTypes>({
  activeUser: initialUser,
  setActiveUser: (user: User | ((prevState: User) => User)) => {},
  covidData: [],
  setCovidData: (
    data: CovidData[] | ((prevState: CovidData[]) => CovidData[])
  ) => {},
  countries: [],
  setCountries: (data: Country[] | ((prevState: Country[]) => Country[])) => {},
});

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<User>(initialUser);
  const [covidData, setCovidData] = useState<CovidData[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  return (
    <GlobalProviderContext.Provider
      value={{
        activeUser,
        covidData,
        countries,
        setActiveUser,
        setCovidData,
        setCountries,
      }}
    >
      {children}
    </GlobalProviderContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalProviderContext);
