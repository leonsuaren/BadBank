import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Card } from '../../components/card';

export const Deposit = () => {
  const [show, setShow] = useState(true);
  const [error, setError] = useState('');
  const [deposit, setDeposit] = useState(0);
  const [validateForm, setValidateForm] = useState(false);
  const [userAccountData, setUserAccountData] = useState([]);
  const [balance, setBalance] = useState(userAccountData.balance);

  const userEmail = localStorage.getItem('user');
  const handleOnFindCostumerChecking = async () => {
     await axios.post('http://localhost:8080/api/account/find-costumer-accounts', { costumer: userEmail }).then((response) => {
      setUserAccountData(response.data.accounts[0].balance);
      setBalance(response.data.accounts[0].balance);

    }).catch((error) => {
    }); 
  }

  useEffect(() => {
    handleOnFindCostumerChecking();
  }, []);

  const handleOnDeposit = async () => {
    await axios.put('http://localhost:8080/api/account/deposit-checking-account', { costumer: userEmail, balance: balance, deposit: deposit }).then((response) => {
    }).catch((error) => {
    });
    handleOnFindCostumerChecking();
    setDeposit(0);
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
        text={'Checking Account Balance= ' + '$' + balance}
        body={show ? (
          <div>
            Deposti Amount<br />
            <input type="number" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit} onChange={e => setDeposit(e.target.value)}
            /><br />
            <button type="submit" className="btn btn-light" onClick={handleOnDeposit}
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