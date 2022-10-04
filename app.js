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


app.use('/api/auth', authRouter);
app.use('/api/account', accoutRouter);
app.use('/api/feedback', feedbackRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
};

app.listen(PORT, () => {
  console.log(`App listening on por ${PORT}`);
});