import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './styles.css';

export const AllData = () => {
  const [costumerName, setCostumerName] = useState('');
  const [userAccountData, setUserAccountData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [accountName, setAccountName] = useState('');
  const [success, setSuccess] = useState(false);
  let accountNumber = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
  const userEmail = localStorage.getItem('user');

  const fetchData = () => {
    axios.post('http://localhost:8080/api/account/find-costumer-accounts', { costumer: userEmail }).then((response) => {
      setUserAccountData(response.data.accounts);
    }).catch((error) => {
    });
  }
  const fetchUserData = () => {
    axios.post('http://localhost:8080/api/account/find-all-user-data', { email: userEmail }).then((response) => {
      setCostumerName(response.data.user.username);
    }).catch((error) => {

    });
  }
  useEffect(() => {
    fetchData();
    fetchUserData();
  }, []);
  const handleOnAddAccount = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8080/api/account/create-account', { accountType: 'Savings', accountNumber: accountNumber, accountName: accountName, balance: balance, costumer: userEmail }).then((response) => {
      setUserAccountData([...userAccountData, response.data.account]);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }).catch((error) => {
    });
  };

  const handleOnDeleteAccount = async (_id) => {
    await axios.post('http://localhost:8080/api/account/delete-bank-account', { _id: _id }).then((response) => {
      fetchData()
    }).catch((error) => {
    });
  }

  return (
    <div className='container container-margin'>
      <div className='main-grid'>
        <div className='user-name'>
          <h1>{costumerName}</h1>
        </div>
        <div className='create-account-button'>
          <button type="button" className="btn btn-primary add-account-button" data-bs-toggle="modal" data-bs-target="#createAccountModal" disabled={userAccountData.length > 3 ? true : false}>Add Account</button>
          <div className="modal fade" id="createAccountModal" tabIndex="-1" aria-labelledby="createAccountModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="createAccountModalLabel">Add Saving Account</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={(e) => handleOnAddAccount(e)}>
                  <div className="modal-body">
                    Account Type<br />
                    <input type="input" className="form-control" placeholder="Savings" disabled /><br />
                    Inicial Balance<br />
                    <input type="input" className="form-control" placeholder="Inicial Balance" value={balance} onChange={e => setBalance(e.target.value)} /><br />
                    Description<br />
                    <input type="input" className="form-control" placeholder="Ex. To Buy a Car" value={accountName} onChange={e => setAccountName(e.target.value)} /><br />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled={balance === 0 || accountName === ''}>Add Account</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='accounts-table'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Account Type</th>
                <th scope="col">Account Number</th>
                <th scope="col">Balance</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {
                userAccountData.map((accounts, key) => {
                  return (
                    <tr key={key}>
                      <td>{accounts.accountType}</td>
                      <td>{accounts.accountNumber}</td>
                      <td>${accounts.balance}</td>
                      <td>{accounts.accountName}</td>
                      {
                        accounts.accountType === "Checking" ? '' : <td>
                          <button
                            className='btn btn-danger'
                            disabled={accounts.balance <= 0 ? false : true}
                            onClick={() => handleOnDeleteAccount(accounts._id)}
                          >Delete</button>
                        </td>
                      }

                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          {
            success ?
            <div className="alert alert-success" role="alert">
              Saving account created succefullly.
            </div> : ''
          }
        </div>
      </div>
    </div>
  )
}