import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/user-context';
import { Card } from '../../components/card';
import './styels.css'

export const Withdraw = () => {
  const userContext = useContext(UserContext);
  const userBalance = userContext.userBalance;
  const [show, setShow] = useState(true);
  const [withdraw, setWithdraw] = useState(0);
  const [balance, setBalance] = useState(0);
  const [validateForm, setValidateForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setBalance(userBalance);
  }, []);

  function handleWithdraw() {
    if (withdraw > userBalance) {
      setError('Not enogth cash!');
      setValidateForm(true);
      setWithdraw(0);
      setTimeout(() => {
        setError('');
        setValidateForm(false);
      }, 3000);
      return
    }
    if (withdraw <= 0) {
      setError('Please enter a valid amount!');
      setValidateForm(true);
      setWithdraw(0);
      setTimeout(() => {
        setError('');
        setValidateForm(false);
      }, 3000);
      return
    }
    setBalance(Number(balance) - Number(withdraw));
    userContext.setUserBalance(balance);
    setShow(false);
    // setWithdraw(0);
    setShow(false);
    return
  }

  function handleAnotherWithdraw() {
    setShow(true);
  }

  return (
    <div className='container alert-container'>
      <Card
        bgcolor='danger'
        header='Withdraw'
        text={'Balance = ' + userBalance}
        body={show ? (
          <div>
            Withdraw Amount<br />
            <input type="number" className="form-control" id="withdraw" placeholder="Enter withdraw Amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}
            /><br />
            <button type="submit" className="btn btn-light" onClick={handleWithdraw} disabled={userBalance <= 0 ? true : false}
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