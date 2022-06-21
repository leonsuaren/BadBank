function Spinner() {
  return (
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState();
  const [show, setShow] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [invalidCredentials, setInvalidCredentials] = React.useState(false);
  const ctx = React.useContext(UserContext);
  const navigate = window.ReactRouterDOM.useHistory();

  function validate(field, label) {
    if (!field) {
      setStatus('Error ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true
  }

  function handleLogin() {
    if (!validate(email, 'email')) return;
    if (!validate(password, 'password')) return
    if (email === ctx.user.email && password === ctx.user.password) {
      setShow(false);
      ctx.setUserLogin(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      setTimeout(() => {
        navigate.push('/');
      }, 5000);
    } else {
      setInvalidCredentials(true);
      setTimeout(() => {
        setInvalidCredentials(false);
      }, 3000);
    }
  }

  return (
    <div className='container alert-container'>
      <Card
        bgcolor="warning"
        header="Login"
        status={status}
        body={show ? (
          <div>
            Email<br />
            <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)}
            /><br />
          Password<br />
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}
            /><br />
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
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
        invalidCredentials ?
          <div class="alert alert-warning" role="alert">
            Invalid Credentials, Please try again!
          </div>
          : ''
      }
    </div>
  )
}