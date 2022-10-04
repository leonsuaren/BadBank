import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card } from '../../components/card';
import { UserContext } from '../../context/user-context/UserContext';
import './styles.css';

export const Home = () => {
  const [userName, setUserName] = useState('');
  const userEmail = localStorage.getItem('user');
  const userContext = useContext(UserContext);
  const userLogin = userContext.userLogin;
  const userLogout = userContext.userLogout;

  const fetchUserData = async () => {
    await axios.post('http://localhost:8080/api/account/find-all-user-data', { email: userEmail }).then((response) => {
      setUserName(response.data.user.username);
    }).catch((error) => {

    });
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className='main-container container'>
      <Card
        bgcolor="danger"
        txtcolor="white"
        header={
          userLogin ? "BadBank Home Page" : "BadBank Landing Page"
        }
        title={
          userLogin ?
            <div>
              Wellcome to BadBank <br /> {userName}
            </div>
            : "Wellcome to Badbank"
        }
        text={
          userLogin ? "The Best Virtual Bank" : "Please Login to see you account"
        }
        body={(
          <img
            src="./bank.png"
            className="img-fluid"
            alt="Responsive Image"
          />
        )}
      />
      {
        userLogout &&
        <div className="alert alert-success" role="alert">
          Thanks for using our App, see you soon!
        </div>
      }
    </div>
  )
}