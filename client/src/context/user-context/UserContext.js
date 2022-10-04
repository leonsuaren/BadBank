import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userBalance, setUserBalance] = useState(100);
  const [user, setUser] = useState({});
  const [userLogin, setUserLogin] = useState(false);
  const [userLogout, setUserLogout] = useState(false);
  const [userFeedback, setUserFeedback] = useState();
  const userEmail = localStorage.getItem('user');

  const [userAccountData, setUserAccountData] = useState([]);
  useEffect(() => {
    async function fetchUserData() {
     await axios.post(`http://localhost:${process.env.PORT}/api/account/find-all-user-data`, { email: userEmail }).then((response) => {
      setUserAccountData(response.data);
      setUserFeedback(response.data.user.feedback);
    }).catch((error) => {
    }); 
  }
  fetchUserData();
    if (localStorage.getItem('user')) {
      setUserLogin(true);
    }
  }, []);
  if (!userAccountData) return null;
  return (
    <UserContext.Provider value={{ userBalance, user, setUserBalance, setUser, userAccountData, userLogin, setUserLogin, userLogout, setUserLogout, userFeedback }}>
      { children }
    </UserContext.Provider>
  )
}