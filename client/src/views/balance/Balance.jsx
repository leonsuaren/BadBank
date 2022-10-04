import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

export const Balance = () => {
  const [userName, setUserName] = useState('');
  const userEmail = localStorage.getItem('user');
  const [userAccountData, setUserAccountData] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);

  const fetchUserData = async () => {
    await axios.post('http://localhost:5000/api/account/find-all-user-data', { email: userEmail }).then((response) => {
      setUserName(response.data.user.username);
      setUserAccountData(response.data.accounts);
      setAccountBalance(response.data.accounts[0].balance);
    }).catch((error) => {

    });
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleOnCheckingBalance = (e) => {
    e.preventDefault();
    setAccountBalance(e.target.value)
  };
  return (
    <div className='container container-margin'>
      <div className='grid-container'>
        <div className='title'><h1>{userName}</h1></div>
        <div className='drop-down'>
          <h5>Select an Account</h5>
          <div className="form-floating">
            <form className='form' onSubmit={(e) => { handleOnCheckingBalance(e) }}>
              <select className="form-select select" id="floatingSelect" aria-label="Floating label select example" onChange={(e) => { handleOnCheckingBalance(e) }}>
                {
                  userAccountData.map((account, key) => {
                    return (
                      <option key={key} value={account.balance}>
                        {
                          account.accountType === 'Checking' ? account.accountType : account.accountType + ' to ' + account.accountName
                        }
                      </option>
                    )
                  })
                }
              </select>
            </form>
          </div>
        </div>

        <div className='balance-area'><h3>Balance</h3>{accountBalance === 0 ? '--' : '$' + accountBalance}</div>
      </div>
    </div>
  )
}