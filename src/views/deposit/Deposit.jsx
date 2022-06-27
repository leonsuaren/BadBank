import React, { useState, useContext, useEffect } from 'react';

import { UserContext } from '../../context/user-context';
import { Card } from '../../components/card';

export const Deposit = () => {
  const userContext = useContext(UserContext);
  const userBalance = userContext.userBalance;
  const [show, setShow] = useState(true);
  const [error, setError] = useState('');
  const [deposit, setDeposit] = useState(0);
  const [balance, setBalance] = useState(0);
  const [validateForm, setValidateForm] = useState(false);

  useEffect(() => {
    setBalance(userBalance);
  }, []);

  function handleDeposit() {
    if (deposit <= 0) {
      setDeposit(0);
      setValidateForm(true);
      setError('Deposit amount must be greater that 0');
      setTimeout(() => {
        setError('');
        setValidateForm(false);
      }, 3000);
      return
    }
    setBalance(Number(deposit) + Number(balance))
    userContext.setUserBalance(balance);
    setShow(false);
    return;
  }

  function handleAnotherDeposit() {
    setShow(true);
  }

  return (
    <div className='container alert-container'>
      <Card
        bgcolor='success'
        header='Deposit'
        text={'Balance = ' + balance}
        body={show ? (
          <div>
            Deposti Amount<br />
            <input type="number" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit} onChange={e => setDeposit(e.target.value)}
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
      {
        validateForm ?
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
          : ''
      }
    </div>
  )
}