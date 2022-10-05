require('dotenv').config({ path: './.config.env' })
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

const authRouter = require('./routes/auth');
const accoutRouter = require('./routes/bank-account');
const feedbackRouter = require('./routes/feedback');

connectDB();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});


app.use('/api/auth', authRouter);
app.use('/api/account', accoutRouter);
app.use('/api/feedback', feedbackRouter);

// This is another regular expression that will match everything that does not
// starts with /api, in other words we delegate api calls to the back end and
// not api calls to the front end.
app.all(new RegExp('^(?!/api)'), (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
};

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});