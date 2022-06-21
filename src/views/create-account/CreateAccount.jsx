function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validateForm, setValidateForm] = React.useState(false);
  const [disabledButton, setDisabledButton] = React.useState(true)
  const Link = window.ReactRouterDOM.Link;
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    if (name.length > 0 && email.length > 0 && password.length >= 8) {
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
    ctx.setUser({
      name: name,
      email: email,
      password: password
    });
    ctx.users.push({ name, email, password, balance: 100 });
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

  return (
    <div className='container alert-container'>
      <Card
        bgcolor="primary"
        header="Create Account"
        body={show ?
          (
            <div>
              Name<br />
              <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)}
              /><br />
              Email Address<br />
              <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)}
              /><br />
              Password<br />
              <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)}
              /><br />
              <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={disabledButton}
              >Create Account</button>
            </div>
          ) : (
            <div>
              <h5>User Created, Please Login</h5>
              <Link type="submit" className="btn btn-light" to='/login' 
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