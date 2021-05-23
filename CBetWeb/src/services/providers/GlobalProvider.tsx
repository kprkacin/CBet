import React, { ReactNode, useContext, useState } from 'react';

import { initialUser } from '../users/consts';
import { User } from '../users/types';

interface GlobalProviderProps {
  children: ReactNode;
}

interface ContextTypes {
  activeUser: User;
  setActiveUser: React.Dispatch<React.SetStateAction<User>>;
}

export const GlobalProviderContext = React.createContext<ContextTypes>({
  activeUser: initialUser,
  setActiveUser: (user: User | ((prevState: User) => User)) => {},
});

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<User>(initialUser);

  return (
    <GlobalProviderContext.Provider value={{ activeUser, setActiveUser }}>
      {children}
    </GlobalProviderContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalProviderContext);
