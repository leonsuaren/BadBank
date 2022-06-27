import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

import { UserContext } from '../../context/user-context';

export const Navbar = () => {
  const userContext = useContext(UserContext);
  const userLogin = userContext.userLogin;
  const params = useLocation();

  function handleOnLogout() {
    userContext.setUserLogin(false);
    userContext.setUser({});
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
                <Link className={params.pathname === '/deposit' ? "nav-link link-animation active" : "nav-link link-animation" } to="deposit">Deposit</Link>
              </li>
            }
            {
              userLogin &&
              <li className="nav-item">
                <Link className={params.pathname === '/withdraw' ? "nav-link link-animation active" : "nav-link link-animation" } to="/withdraw">Withdraw</Link>
              </li>
            }
            {
              userLogin &&
              <li className="nav-item">
                <Link className={params.pathname === '/balance' ? "nav-link link-animation active" : "nav-link link-animation" } to="/balance">Balance</Link>
              </li>
            }
            {
              userLogin &&
              <li className="nav-item">
                <Link className={params.pathname === '/all-data' ? "nav-link link-animation active" : "nav-link link-animation" } to="/all-data">All Data</Link>
              </li>
            }
          </ul>
          <div className='d-flex'>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                !userLogin &&
                <li className="nav-item">
                  <Link className={params.pathname === '/create-account' ? "nav-link link-animation active" : "nav-link link-animation" } aria-current="page" to="/create-account">Create Account</Link>
                </li>
              }
              {
                userLogin ?
                  <li className="nav-item">
                    <Link className="nav-link link-animation" to="" onClick={handleOnLogout}>Logout</Link>
                  </li>
                  :
                  <li className="nav-item">
                    <Link className={params.pathname === '/login' ? "nav-link link-animation active" : "nav-link link-animation" } to='/login'>Login</Link>
                  </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}