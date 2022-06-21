import React, { useContext } from 'react';

import { UserContext } from '../../context/user-context';
import { Card } from '../../components/card';

export const Home = () => {
  const userContext = useContext(UserContext);
  const userLogin = userContext.userLogin;

  return (
    <Card 
      bgcolor="danger"
      txtcolor="white"
      header={
        userLogin ? "BadBank Home Page" : "BadBank Landing Page"
      }
      title={
        userContext.user.name === undefined ? "Welcome to BadBank" :
        `Welcome to BadBank ${userContext.user.name}`}
      text={
        userLogin ? "The Best Virtual Bank" : "Please Login to see you account"
      }
      body={(
        <img 
          src="./bad-bank.png"
          className="img-fluid"
          alt="Responsive Image"
        />
      )}
    />
  )
}