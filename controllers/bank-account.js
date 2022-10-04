const BankAccount = require('../models/bank-account');
const User = require('../models/user');

exports.createBankAccount = async (req, res, next) => {
  const { accountType, accountNumber, accountName, balance, costumer } = req.body;
  if (!accountType || !accountNumber || !accountName) {
    return res.status(400).json({ message: 'All fields are require', success: false });
  };
  try {
    const account = await BankAccount.create({ accountType, accountNumber, accountName, balance, costumer });
    res.status(200).json({ message: 'Account created successully', success: true, account: account });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', error: error });
  }
};

exports.findCheckingAccount = async (req, res, next) => {
  const { costumer } = req.body;
  try {
    const account = await BankAccount.findOne({ contumer: costumer, accountType: 'Checking' });
    res.status(200).json({ message: 'Find Checking account success', account: account });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', error: error });
  }
}

exports.findBankAccounts = async (req, res, next) => {
  const { costumer } = req.body;
  try {
    const accounts = await BankAccount.find({ costumer: costumer });
    res.status(200).json({ message: 'Find Accounts Success', accounts: accounts });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', error: error });
  }
};

exports.deleteBankAccount = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const account = await BankAccount.deleteOne({ _id: _id });
    res.status(200).json({ message: 'Delete account success', account: account });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', error: error });
  }
}

exports.findAllUserData = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const accounts = await BankAccount.find({ costumer: email });
    res.status(200).json({ message: 'All user data fetched success', user: user, accounts: accounts });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', error: error });
  }
}

exports.depositCheckingAccount = async (req, res, next) => {
  const { costumer, balance, deposit } = req.body;
  try {
    const account = await BankAccount.updateOne({ costumer: costumer }, { $set: { balance: balance + Number(deposit) } });
    res.status(200).json({ message: 'Updated Account Success', account: account });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', error: error });
  }
}

exports.withdrawCheckingAccount = async (req, res, next) => {
  const { costumer, balance, withdraw } = req.body;
  try {
    const account = await BankAccount.updateOne({ costumer: costumer }, { $set: { balance: balance - Number(withdraw) } });
    res.status(200).json({ message: 'Updated Account Success', accont: account });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', error: error });
  }
}

exports.transferBetweenCostumers = async (req, res, next) => {
  const { from, to, amount } = req.body;
  const senderAccount = await BankAccount.findOne({ costumer: from });
  const receiverAccount = await BankAccount.findOne({ costumer: to });
  try {
    await BankAccount.updateOne({ costumer: from, accountType: 'Checking' }, { $set: { balance: senderAccount.balance - Number(amount) } });
    await BankAccount.updateOne({ costumer: to, accountType: 'Checking' }, { $set: { balance: receiverAccount.balance + Number(amount) } });
    res.status(200).json({ message: 'Transfer between two costumers successfully', success: true });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', error: error });
  }
}

exports.transferBetweenAccounts = async (req, res, next) => {
  const { from, to, amount } = req.body;
  const sendingAccount = await BankAccount.findOne({ accountNumber: from });
  const receivingAccount = await BankAccount.findOne({ accountNumber: to });
  try {
    await BankAccount.updateOne({ accountNumber: from }, { $set: { balance: sendingAccount.balance - Number(amount) } });
    await BankAccount.updateOne({ accountNumber: to }, { $set: { balance: receivingAccount.balance + Number(amount) } });
    res.status(200).json({ message: 'Transfer between two accounts successfully', success: true });
  } catch (error) {
    res.status(400).json({ message: 'Server Error', error: error });
  }
}