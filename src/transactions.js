const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'redux',
  password : 'redux',
  database : 'cryptos',
});

const getTransactions = (req, res) => {
  const { user } = req.query;

  const selectStatement = `SELECT * FROM transactions WHERE user='${user}'`;

  connection.query(selectStatement, (err, rows) => {
    res.json({ transactions: rows });
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

  const insertStatement = `
    INSERT INTO transactions(id, user, crypto, type, amount, price) 
    VALUES(NULL, '${user}', '${crypto}', '${type}', ${amount}, ${price})
  `;

  connection.query(insertStatement, (err) => {
    res.json({ POST: true });
  });
};

const deleteTransaction = (req, res) => {
  const { transactionId } = req.params;

  const deleteStatement = `DELETE FROM transactions WHERE id=${transactionId}`;
  
  connection.query(deleteStatement, (err, rows) => {
    res.json({ DELETE: true });
  });
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
};
