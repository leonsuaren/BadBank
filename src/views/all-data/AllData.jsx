import React, { useContext } from 'react';
import { Card } from '../../components/card'
import { UserContext } from '../../context/user-context';
import { Link } from 'react-router-dom';

export const AllData = () => {
  const userContext = useContext(UserContext);
  const balance = userContext.userBalance;
  const userName = userContext.user.name;
  const userEmail = userContext.user.email;
  return (
    <div className='container alert-container'>
    <Card
      bgcolor='success'
      header='Account Resume'
      body={(
        <div>
          {
            <ul>
              <li>UserName: {userName}</li>
              <li>Email: {userEmail}</li>
              <li>Balance: {balance}</li>
            </ul>
          }
          <Link className='btn btn-primary' to='/'>Home</Link>
        </div>
      )
      }
    />
  </div>
  )
}