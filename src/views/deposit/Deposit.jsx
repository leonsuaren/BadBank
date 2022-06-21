function Deposit() {
  const [show, setShow] = React.useState(true);
  const [deposit, setDeposit] = React.useState(0);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);
  const userBalance = ctx.users[0].balance;

  function handleDeposit() {
    if (deposit <= 0) {
      setDeposit(0);
      setStatus('Please Enter a Valid Deposit');
      setTimeout(() => {
        setStatus('');
      }, 3000);
      return
    }
    ctx.setUserBalance(s => s + Number(deposit));
    setShow(false);
  }

  function handleAnotherDeposit() {
    setShow(true);
  }

  return (
    <Card
      bgcolor='success'
      header='Deposit'
      text={'Balance = ' + userBalance}
      status={status}
      body={show ? (
        <div>
          Deposti Amount<br />
          <input type="number" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)}
          /><br />
          <button type="submit" className="btn btn-light" onClick={handleDeposit}
          >Deposit</button>
        </div>
      ) : (
          <div>
          Deposit Success<br />
          <button type="submit" className="btn btn-light" onClick={handleAnotherDeposit}
          >Another Deposit</button>
          </div>
        )

      }
    />
  )
}