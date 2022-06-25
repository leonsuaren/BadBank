import React, { useState, useContext, useEffect } from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';

import './styles.css';

import { UserContext } from '../../context/user-context';
import { Card } from '../../components/card';

export const CreateAccount = () => {
  const [show, setShow] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateForm, setValidateForm] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (password.length >= 8) {
      setDisabledButton(false);
    }
  }, [name, email, password]);

  function handleCreate() {
    if (!validate(name, 'name') || !validate(email, 'email') || !validate(password, 'password')) {
      setValidateForm(true)
      return
    } 
    if (password.length < 8) {
      setError('Password must be al least 8 characters long');
      setValidateForm(true);
      setTimeout(() => {
        setValidateForm(false);
      }, 3000);
      return
    }
    if (!validator.isEmail(email)) {
      setError('Please enter a valid email.');
      setValidateForm(true);
      setTimeout(() => {
        setValidateForm(false);
      }, 3000);
      return
    }
    userContext.setUser({
      name: name,
      email: email,
      password: password,
      balance: 100
    });
    setShow(false);
  }

  function validate(field, label) {
    if (!field) {
      setError('Please enter a valid ' + label);
      setTimeout(() => setValidateForm(''), 3000);
      return false
    }
    return true;
  }

  function clearForm() {
    setName('');
    setPassword('');
    setEmail('');
    setShow(true);
  }

  const handleOnChangePasswordInput = (e) => {
    if (e.currentTarget.value.length < 8) {
      setDisabledButton(true);
    }
    setPassword(e.currentTarget.value);
  }

  return (
    <div className='container alert-container'>
      <Card
        bgcolor="primary"
        header="Create Account"
        body={show ?
          (
            <div>
              Name<br />
              <input type="input" className="form-control" id="name" placeholder="Enter Name" name="name" value={name} onChange={e => setName(e.currentTarget.value)}
              /><br />
              Email Address<br />
              <input type="input" className="form-control" id="email" placeholder="Enter Email" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)}
              /><br />
              Password<br />
              <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" value={password} onChange={e => handleOnChangePasswordInput(e)}
              /><br />
              <button type="submit" className="btn btn-light" name="submit" role="button" onClick={handleCreate} disabled={disabledButton}
              >Create Account</button>
            </div>
          ) : (
            <div>
              <h5>User Created, Please Login</h5>
              <Link className="btn btn-light" to='/login' 
              >Login</Link>
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