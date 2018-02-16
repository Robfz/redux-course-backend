const express = require('express');
const bodyParser = require('body-parser');
const { getCryptoPrices } = require('./cryptoPrices');
const {
  getTransactions,
  createTransaction,
  deleteTransaction,
} = require('./transactions');

const PORT = process.env.PORT || 3000;

const api = express();
const router = express.Router();

api.use(bodyParser.json());

router.route('/')
  .get((req, res) => res.status(200).send('Salu2'));

router.route('/prices')
  .get(getCryptoPrices);

router.route('/transactions')
  .get(getTransactions)
  .post(createTransaction);

router.route('/transactions/:transactionId')
  .delete(deleteTransaction);

api.use('/', router);

api.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
