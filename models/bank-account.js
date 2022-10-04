const mongoose = require('mongoose');

const BankAccountSchema = new mongoose.Schema({
  accountType : {
    type: String,
    require: true
  },
  accountNumber: {
    type: String,
    require: true
  },
  accountName: {
    type: String,
    require: false
  },
  balance: {
    type: Number,
    require: true
  },
  costumer: {
    type: String,
    require: true
  }
});

const BankAccount = mongoose.model("BankAccount", BankAccountSchema);

module.exports = BankAccount;