const express = require('express');
const router = express.Router();

const { createBankAccount, findBankAccounts, deleteBankAccount, findAllUserData, depositCheckingAccount, findCheckingAccount, withdrawCheckingAccount, transferBetweenCostumers, transferBetweenAccounts } = require('../controllers/bank-account');

router.route('/create-account').post(createBankAccount);
// router.route('/find-costumer-checking').post(findCheckingAccount);
router.route('/find-costumer-accounts').post(findBankAccounts);
router.route('/delete-bank-account').post(deleteBankAccount);
router.route('/find-all-user-data').post(findAllUserData);
router.route('/deposit-checking-account').put(depositCheckingAccount);
router.route('/withdraw-checking-account').put(withdrawCheckingAccount);
router.route('/transfer-between-costumers').put(transferBetweenCostumers);
router.route('/transfer-between-accounts').put(transferBetweenAccounts);

module.exports = router;