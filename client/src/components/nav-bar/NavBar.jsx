import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

import { UserContext } from '../../context/user-context/UserContext';

const Spinner = () => {
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export const Navbar = () => {
  const params = useLocation();
  const [userName, setUserName] = useState('');
  const userEmail = localStorage.getItem('user');
  const userContext = useContext(UserContext);
  const userLogin = userContext.userLogin;
  const [openToPerson, setOpenToPerson] = useState(false);
  const [openToAccount, setOpenToAccount] = useState(false);
  const [closeOptionsButtons, setCloseOptionsButtons] = useState(true);
  const [checkingData, setCheckingData] = useState(0);
  const [receiverEmail, setReceiverEmail] = useState('');
  const [sendingAmount, setSendingAmount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [successAmount, setSuccessAmount] = useState(false);
  const [error, setError] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [AmountMessage, setAmountMessage] = useState('');
  const [next, setNext] = useState(true);
  const [transfer, setTransfer] = useState(true);
  const [costumerData, setCostumerData] = useState([]);
  const [transferToCostumerData, setTransferToCostumerData] = useState([]);
  const [transferFromCostumerData, setTransferFromCostumerData] = useState({});
  const [transferToCostumerAccount, setTransferToCostumerAccount] = useState({});
  const [transferingAmount, setTransferingAmount] = useState(0);
  const [showTransferAmount, setShowTransferAmoun] = useState(false);
  const fetchUserData = async () => {
    await axios.post('http://localhost:8080/api/account/find-all-user-data', { email: userEmail }).then((response) => {
      setUserName(response.data.user.username);
      setCheckingData(response.data.accounts[0]);
      setCostumerData(response.data.accounts);
    }).catch((error) => {

    });
  }

  useEffect(() => {
    fetchUserData();
    // handleOnFindReceiver()
  }, [userLogin]);



  function handleOnLogout() {
    fetchUserData();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    userContext.setUserLogin(false);
    userContext.setUserLogout(true);
    setTimeout(() => {
      userContext.setUserLogout(false);
    }, 3000);
  }

  const handleOpenToAccount = () => {
    setOpenToAccount(true);
    setOpenToPerson(false);
    setCloseOptionsButtons(false);
  }

  const handleOpenToPerson = () => {
    setOpenToPerson(true);
    setOpenToAccount(false);
    setCloseOptionsButtons(false);
  }

  const handleOnCancelTransfers = () => {
    setOpenToPerson(false);
    setOpenToAccount(false);
    setCloseOptionsButtons(true);
  }

  const handleOnTransferBetweenPersons = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/account/find-costumer-accounts', { costumer: receiverEmail }).then((response) => {
    }).catch((error) => {

    });
    await axios.put('http://localhost:8080/api/account/transfer-between-costumers', {
      from: userEmail, to: receiverEmail, amount: sendingAmount
    }).then((response) => {
    }).catch((error) => {

    });
  }

  const handleOnFindReceiver = async (email) => {
    setError(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      axios.post('http://localhost:8080/api/auth/find-user', { receiverEmail: email, senderEmail: userEmail }).then((response) => {
        setSuccess(response.data.success);
        setMessage(response.data.message);
        setTimeout(() => {
          setSuccess(false);
          setNext(false);
        }, 3000);
      }).catch((error) => {
        setError(error);
        setMessage(error.response.data.message);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
    }, 3000);
  };

  const handleOnAmountSending = (e) => {
    if (e <= 0 || e >= 501) {
      setErrorAmount(true);
      setAmountMessage('The tranfer amount should be between 0 and 500!');
      setTimeout(() => {
        setErrorAmount(false);
        setAmountMessage('');
      }, 3000);
      return
    }
    if (e >= checkingData.balance) {
      setErrorAmount(true);
      setAmountMessage('Not Enough founds!');
      setTimeout(() => {
        setErrorAmount(false);
        setAmountMessage('');
      }, 3000);
      return
    }
    setTransfer(false);
  }

  const handleOnSelectionFromAccount = (e) => {
    const account = e.target.value
    const newConstumerData = costumerData.filter((accounts) => {
      return accounts.accountNumber !== account
    })
    setTransferToCostumerData(newConstumerData);
    const fromAccount = costumerData.find((accounts) => {
      return accounts.accountNumber === account
    });
    setTransferFromCostumerData(fromAccount);
    setShowTransferAmoun(true);
  }

  const handleOnTransferBetweenAccounts = async () => {
    axios.put('http://localhost:8080/api/account/transfer-between-accounts', { from: transferFromCostumerData.accountNumber, to: transferToCostumerAccount, amount: transferingAmount }).then((response) => {

    }).catch((error) => {

    });
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className={params.pathname === '/' ? "navbar-brand active-brand" : "navbar-brand"} to="/">BadBank</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              userLogin &&
              <li className="nav-item">
                <Link className={params.pathname === '/deposit' ? "nav-link link-animation active" : "nav-link link-animation"} to="deposit">Deposit</Link>
              </li>
            }
            {
              userLogin &&
              <li className="nav-item">
                <Link className={params.pathname === '/withdraw' ? "nav-link link-animation active" : "nav-link link-animation"} to="/withdraw">Withdraw</Link>
              </li>
            }
            {
              userLogin &&
              <li className="nav-item">
                <Link className={params.pathname === '/balance' ? "nav-link link-animation active" : "nav-link link-animation"} to="/balance">Balance</Link>
              </li>
            }
            {
              userLogin &&
              <li className="nav-item">
                <Link className={params.pathname === '/all-data' ? "nav-link link-animation active" : "nav-link link-animation"} to="/all-data">All Data</Link>
              </li>
            }
            {
              userLogin &&
              <li className="nav-item">
                <button type="button" className="btn btn-primary transfer-center-button" data-bs-toggle="modal" data-bs-target="#transferCenterModal" onClick={fetchUserData}>Transfer Center</button>
                <div className="modal fade" id="transferCenterModal" tabIndex="-1" aria-labelledby="transferCenterModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title title" id="transferCenterModalLabel">Transfer Center</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleOnCancelTransfers}></button>
                      </div>
                      {closeOptionsButtons &&
                        <div className='modal-options'>
                          <h5 className='modal-options-title'>What would you like to do?</h5>
                          <button className='btn btn-primary transfer-button' onClick={handleOpenToAccount} disabled={costumerData.length <= 1 ? true : false}>Transfer between my accounts</button>
                          {
                            costumerData.length <= 1 ?
                              <div className="alert alert-danger" role="alert">
                                You only have a checking account, please create a saving account to continue!
                            </div> : ''
                          }
                          <button className='btn btn-primary transfer-button' onClick={handleOpenToPerson} disabled={checkingData.balance === 0 ? true : false}>Transfer to another person</button>
                          {
                            checkingData.balance <= 0 ?
                              <div className="alert alert-danger" role="alert">
                                The Balance on your checking account is 0, please deposit or transfer to continue!
                            </div> : ''
                          }
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleOnCancelTransfers}>Cancel</button>
                          </div>
                        </div>
                      }
                      {openToAccount &&
                        <form>
                          <h5 className='modal-options-title'>Transfer Between My Accounts</h5>
                          <div className="modal-body">
                            From:<br />
                            <select className="form-select select" id="floatingSelect" aria-label="Floating label select example" onBlur={(e) => handleOnSelectionFromAccount(e)}>
                              {
                                costumerData.map((account, key) => {
                                  return (
                                    <option key={key} value={account.accountNumber} disabled={account.balance <= 0}>
                                      {
                                        account.accountType === 'Checking' ? account.accountType : account.accountType + ' to ' + account.accountName
                                      }
                                    </option>
                                  )
                                })
                              }
                            </select>
                            To:<br />
                            <select className="form-select select" id="floatingSelect" aria-label="Floating label select example" onBlur={(e) => setTransferToCostumerAccount(e.target.value)}>
                            {
                              transferToCostumerData.map((account, key) => {
                                return (
                                  <option key={key} value={account.accountNumber}>
                                    {
                                      account.accountType === 'Checking' ? account.accountType : account.accountType + ' to ' + account.accountName
                                    }
                                  </option>
                                )
                              })
                            }
                          </select>
                            The Amount of:<br />
                            <input type="number" className="form-control amount-to-transfer" value={transferingAmount} onChange={(e) => setTransferingAmount(e.target.value)}/><br />
                            {
                              showTransferAmount ?
                              <div className="alert alert-success" role="alert">
                              {`You have $${transferFromCostumerData.balance}.00 available to transfer`}
                              </div> : ''
                            }
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleOnCancelTransfers}>Cancel</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled={transferingAmount <= 0 || transferingAmount > transferFromCostumerData.balance} onClick={handleOnTransferBetweenAccounts}>Transfer</button>
                          </div>
                        </form>
                      }
                      {openToPerson &&
                        <form>
                          <h5 className='modal-options-title'>Transfer To Another Person</h5>
                          <div className="modal-body">
                            From:<br />
                            <input type="input" className="form-control" placeholder={checkingData.accountName + ' -Balance- ' + '$' + checkingData.balance} disabled /><br />
                            To:<br />
                            <input type="input" className="form-control" placeholder="Please enter a valid email" disabled={checkingData.balance <= 0 ? true : false} value={receiverEmail} onChange={(e) => setReceiverEmail(e.currentTarget.value)} onBlur={(e) => handleOnFindReceiver(e.currentTarget.value)} /><br />
                            <div className='display-message-spinner'>
                              {
                                loading ? <Spinner /> : <div>
                                  {
                                    success &&
                                    <div className="alert alert-success" role="alert">
                                      {message}
                                    </div>
                                  }
                                  {
                                    error &&
                                    <div className="alert alert-danger" role="alert">
                                      {message}
                                    </div>
                                  }
                                </div>
                              }
                            </div>
                            The Amount of:<br />
                            <input type="number" className="form-control" placeholder="How much would you like to send?" disabled={next} value={sendingAmount} onChange={(e) => { setSendingAmount(e.currentTarget.value) }} onBlur={(e) => handleOnAmountSending(e.currentTarget.value)} /><br />
                            {
                              successAmount &&
                              <div className="alert alert-success" role="alert">
                                {AmountMessage}
                              </div>
                            }
                            {
                              errorAmount &&
                              <div className="alert alert-danger" role="alert">
                                {AmountMessage}
                              </div>
                            }
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleOnCancelTransfers}>Cancel</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled={transfer}
                              onClick={(e) => { handleOnTransferBetweenPersons(e) }}
                            >Transfer</button>
                          </div>
                        </form>
                      }
                    </div>
                  </div>
                </div>
              </li>
            }
          </ul>
          <div className='d-flex'>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                !userLogin &&
                <li className="nav-item">
                  <Link className={params.pathname === '/create-account' ? "nav-link link-animation active" : "nav-link link-animation"} aria-current="page" to="/create-account">Register</Link>
                </li>
              }
              {
                userLogin ?
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <p className="nav-link">{userName}</p>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link link-animation" to="" onClick={handleOnLogout}>Logout</Link>
                    </li>
                  </ul>
                  :
                  <li className="nav-item">
                    <Link className={params.pathname === '/login' ? "nav-link link-animation active" : "nav-link link-animation"} to='/login'>Login</Link>
                  </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}