import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { UserContext } from '../../context/user-context';
import { Card } from '../../components/card';
import './styels.css'

export const Withdraw = () => {
  const userContext = useContext(UserContext);
  const userBalance = userContext.userBalance;
  const [show, setShow] = useState(true);
  const [withdraw, setWithdraw] = useState(0);
  const [validateForm, setValidateForm] = useState(false);
  const [error, setError] = useState('');
  const [userAccountData, setUserAccountData] = useState([]);
  const [balance, setBalance] = useState(userAccountData.balance);

  const userEmail = localStorage.getItem('user');
  const handleOnFindCostumerChecking = async () => {
     await axios.post('/api/account/find-costumer-accounts', { costumer: userEmail }).then((response) => {
      setUserAccountData(response.data.accounts[0].balance);
      setBalance(response.data.accounts[0].balance);

    }).catch((error) => {
    }); 
  }

  useEffect(() => {
    handleOnFindCostumerChecking();
    // handleOnWithdraw();
  }, []);

  const handleOnWithdraw = async () => {
    await axios.put('/api/account/withdraw-checking-account', { costumer: userEmail, balance: balance, withdraw: withdraw }).then((response) => {
    }).catch((error) => {
    });
    handleOnFindCostumerChecking();
    setWithdraw(0);
    return;
  }

  function handleAnotherWithdraw() {
    setShow(true);
  }

  return (
    <div className='container alert-container'>
      <Card
        bgcolor='danger'
        header='Withdraw'
        text={'Checking Account Balance= ' + '$' + balance}
        body={show ? (
          <div>
            Withdraw Amount<br />
            <input type="number" className="form-control" id="withdraw" placeholder="Enter withdraw Amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}
            /><br />
            <button type="submit" className="btn btn-light" onClick={handleOnWithdraw} disabled={userBalance <= 0 ? true : false}
            >Withdraw</button>
          </div>
        ) : (
            !userBalance <= 0 ?
              <div>
                Withdraw Success<br />
                <button type="submit" className="btn btn-light" onClick={handleAnotherWithdraw}
                >Another Withdraw</button>
              </div>
              : <div>
                <Link className="btn btn-light" to='/deposit'>Deposit</Link>
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