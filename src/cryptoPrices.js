const axios = require('axios');

const BITSO_PUBLIC_PRICES = 'https://api.bitso.com/public/info';

const USDMXNPrice = 18.90;

const getPrices = (bitsoData) => ({
  btc: parseFloat(bitsoData.btc_mxn.rate) / USDMXNPrice,
  eth: parseFloat(bitsoData.eth_mxn.rate) / USDMXNPrice,
  ltc: parseFloat(bitsoData.ltc_mxn.rate) / USDMXNPrice,
  xrp: parseFloat(bitsoData.xrp_mxn.rate) / USDMXNPrice,
});

const getCryptoPrices = (req, res) => {
  axios.get(BITSO_PUBLIC_PRICES)
    .then((response) => {
      const { data } = response;

      res.status(200).json({ prices: getPrices(data) });
    })
    .catch((err) => {
      res.status(504).json({ error: 'Bitso no available' })
    });
};

module.exports = {
  getCryptoPrices,
};