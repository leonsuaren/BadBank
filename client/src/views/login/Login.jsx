import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import { UserContext } from '../../context/user-context';
import { Card } from '../../components/card';

const Spinner = () => {
  return (
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export const Login = () => {
  const [show, setShow] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [validateForm, setValidateForm] = useState(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogin() {
    axios.post(`/api/auth/login`, { email: email, password: password }).then((res) => {
      setMessage(res.data.message);
      setSuccess(res.data.success);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', res.data.user.email);
      setLoading(false);
      setShow(false);
      userContext.setUser(res.data.user)
      setTimeout(() => {
        setLoading(true);
        setSuccess(false);
      }, 3000);
      setTimeout(() => {
        setLoading(true);
        navigate('/');
        userContext.setUserLogin(true);
      }, 6000);
    }).catch((error) => {
      setError(error.response.data.message);
      setValidateForm(true);
      setTimeout(() => {
        setValidateForm(false);
      }, 3000);
    });

  }

  return (
    <div className='container alert-container'>
      <Card
        bgcolor="warning"
        header="Login"
        body={show ? (
          <div>
            Email<br />
            <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)}
            /><br />
            Password<br />
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}
            /><br />
            <div className='btn-group'>
              <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
              <Link className="btn btn-primary" to='/create-account'>Create Account</Link>
            </div>
          </div>
        ) : (
            <div>
              {
                loading ?
                  <Spinner />
                  :
                  <Card
                    bgcolor="warning"
                    header="Login Success"
                    text="Welcome to BadBank"
                  />
              }
            </div>
          )}
      />
      {
        validateForm ?
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
          : ''
      }
      {
        success ?
          <div className="alert alert-success" role="alert">
            {message}
          </div>
          : ''
      }
    </div>
  )
}