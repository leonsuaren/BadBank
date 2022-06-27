import React, { useState, useContext } from 'react';

import { UserContext } from '../../context/user-context';
import { Card } from '../../components/card';

export const Deposit = () => {
  const userContext = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [error, setError] = useState('');
  const userBalance = userContext.user.balance;
  const [deposit, setDeposit] = useState(0);
  const [inicialBalance, setInicialBalance] = useState(userBalance);
  const [balance, setBalance] = useState(0);
  const [validateForm, setValidateForm] = useState(false);
  console.log(deposit);
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
    setBalance(Number(inicialBalance) + Number(deposit));
    setShow(false);
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