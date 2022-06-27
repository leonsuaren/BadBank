import React, { useContext } from 'react';
import { Card } from '../../components/card'
import { UserContext } from '../../context/user-context';
import { Link } from 'react-router-dom';

export const Balance = () => {
  const userContext = useContext(UserContext);
  const balance = userContext.userBalance;
  const user = userContext.user.name;
  return (
    <div className='container alert-container'>
    <Card
      bgcolor='success'
      header={`${user} Balance`}
      text={'Balance = ' + balance}
      body={(
        <div>
          <Link className='btn btn-primary' to='/'>Home</Link>
        </div>
      )
      }
    />
  </div>
  )
}