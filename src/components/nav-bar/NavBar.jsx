function Navbar() {
  const ctx = React.useContext(UserContext);
  const userLogin = ctx.userLogin;
  const Link = window.ReactRouterDOM.Link;
  const params = window.ReactRouterDOM.useLocation();

  function handleOnLogout() {
    ctx.setUserLogin(false);
    ctx.setUser({});
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
                <Link className={params.pathname === '/addaccount' ? "nav-link link-animation active" : "nav-link link-animation" } to='/addaccount'>Add Account</Link>
              </li>
            }
            {
              userLogin &&
              <li className="nav-item">
                <Link className={params.pathname === '/deposit' ? "nav-link link-animation active" : "nav-link link-animation" } to="/deposit">Deposit</Link>
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
                <Link className={params.pathname === '/alldata' ? "nav-link link-animation active" : "nav-link link-animation" } to="/alldata">All Data</Link>
              </li>
            }
          </ul>
          <div className='d-flex'>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                !userLogin &&
                <li className="nav-item">
                  <Link className={params.pathname === '/createaccount' ? "nav-link link-animation active" : "nav-link link-animation" } aria-current="page" to="/createaccount">Create Account</Link>
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