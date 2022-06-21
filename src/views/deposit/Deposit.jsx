import React, { useState, useContext } from 'react';

import { UserContext } from '../../context/user-context';
import { Card } from '../../components/card';

export const Deposit = () => {
  const [show, setShow] = useState(true);
  const [deposit, setDeposit] = useState(0);
  const [status, setStatus] = useState('');
  const userContext = useContext(UserContext);
  const userBalance = userContext.users[0].balance;

  function handleDeposit() {
    if (deposit <= 0) {
      setDeposit(0);
      setStatus('Please Enter a Valid Deposit');
      setTimeout(() => {
        setStatus('');
      }, 3000);
      return
    }
    userContext.setUserBalance(s => s + Number(deposit));
    setShow(false);
  }

  function handleAnotherDeposit() {
    setShow(true);
  }

  return (
    <Card
      bgcolor='success'
      header='Deposit'
      text={'Balance = ' + userBalance}
      status={status}
      body={show ? (
        <div>
          Deposti Amount<br />
          <input type="number" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)}
          /><br />
          <button type="submit" className="btn btn-light" onClick={handleDeposit}
          >Deposit</button>
        </div>
      ) : (
          <div>
          Deposit Success<br />
          <button type="submit" className="btn btn-light" onClick={handleAnotherDeposit}
          >Another Deposit</button>
          </div>
        )

      }
    />
  )
}