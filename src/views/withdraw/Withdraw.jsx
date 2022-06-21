import React, { useState, useContext } from 'react';

import { UserContext } from '../../context/user-context';
import { Card } from '../../components/card';

export const Withdraw = () => {
  const [show, setShow] = useState(true);
  const [withdraw, setWithdraw] = useState(0);
  const [status, setStatus] = useState('');
  const userContext = useContext(UserContext);
  const userBalance = userContext.users[0].balance;

  function handleWithdraw() {
    if (withdraw > userBalance) {
      setStatus('Not enogth cash!');
      setWithdraw(0);
      setTimeout(() => {
        setStatus('');
      }, 3000);
      return
    }
    userContext.setUserBalance(s => s - Number(withdraw));
    setWithdraw(0);
    setShow(false);
  }

  function handleAnotherWithdraw() {
    setShow(true);
  }

  return (
    <Card
      bgcolor='danger'
      header='Withdraw'
      text={'Balance = ' + userBalance}
      status={status}
      body={show ? (
        <div>
          Withdraw Amount<br />
          <input type="number" className="form-control" id="withdraw" placeholder="Enter withdraw Amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)}
          /><br />
          <button type="submit" className="btn btn-light" onClick={handleWithdraw} disabled={userBalance <=0 ? true : false}
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
          <a className="btn btn-light" href="#/deposit">Deposit</a>
          </div>
        )

      }
    />
  )
}