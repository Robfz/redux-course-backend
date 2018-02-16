const mysql = require('mysql');

const DB_DONFIG = {
  host     : 'localhost',
  user     : 'redux',
  password : 'redux',
  database : 'cryptos',
};

const ERROR_500 = { error: 'Internal server error' };

const connection = mysql.createConnection(DB_DONFIG);

// Keep connection alive
setInterval(() => {
  connection.query('SELECT 1');
}, 5000);

const getTransactions = (req, res) => {
  const { user } = req.query;

  if (!user) {
    res.status(400).json({ error: 'Missing user name' });
    return;
  }

  const selectStatement = `SELECT * FROM transactions WHERE user='${user}'`;

  connection.query(selectStatement, (err, rows) => {
    if (err) {
      res.status(500).json(ERROR_500);
    } else {
      res.status(200).json({ transactions: rows });
    }
  });
};

const createTransaction = (req, res) => {
  const {
    user,
    crypto,
    type,
    amount,
    price,
  } = req.body;

  if (!user || !crypto || !type || !amount || !price) {
    res.status(400).json({ error: 'Missing data in payload' });
    return;
  }

  const insertStatement = `
    INSERT INTO transactions(id, user, crypto, type, amount, price) 
    VALUES(NULL, '${user}', '${crypto}', '${type}', ${amount}, ${price})
  `;

  connection.query(insertStatement, (err) => {
    if (err) {
      res.status(500).json(ERROR_500);
    } else {
      res.status(200).json({ POST: true });
    }
  });
};

const deleteTransaction = (req, res) => {
  const { transactionId } = req.params;

  if (!transactionId) {
    res.status(400).json({ error: 'Missing user transaction id' });
    return;
  }

  const deleteStatement = `DELETE FROM transactions WHERE id=${transactionId}`;
  
  connection.query(deleteStatement, (err, result) => {
    if (err) {
      res.status(500).json(ERROR_500)
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'No transaction found' })
      } else {
        res.status(200).json({ DELETE: true });
      }
    }
  });
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
};
