function Home () {
  const ctx = React.useContext(UserContext);
  const userLogin = ctx.userLogin;
  return (
    <Card 
      bgcolor="danger"
      txtcolor="white"
      header={
        userLogin ? "BadBank Home Page" : "BadBank Landing Page"
      }
      title={
        ctx.user.name === undefined ? "Welcome to BadBank" :
        `Welcome to BadBank ${ctx.user.name}`}
      text={
        userLogin ? "The Best Virtual Bank" : "Please Login to see you account"
      }
      body={(
        <img 
          src="./bad-bank.png"
          className="img-fluid"
          alt="Responsive Image"
        />
      )}
    />
  )
}