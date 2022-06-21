import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userBalance, setUserBalance] = useState(100);
  const [user, setUser] = useState({});
  const [userLogin, setUserLogin] = useState(false);


  return (
    <UserContext.Provider value={{ userBalance, user, userLogin, setUserBalance, setUser, setUserLogin }}>
      { children }
    </UserContext.Provider>
  )
}