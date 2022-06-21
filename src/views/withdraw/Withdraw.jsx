function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [withdraw, setWithdraw] = React.useState(0);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);
  const userBalance = ctx.users[0].balance;

  function handleWithdraw() {
    if (withdraw > userBalance) {
      setStatus('Not enogth cash!');
      setWithdraw(0);
      setTimeout(() => {
        setStatus('');
      }, 3000);
      return
    }
    ctx.setUserBalance(s => s - Number(withdraw));
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