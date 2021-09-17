require("dotenv").config();

module.exports = {
  mongoURI: "mongodb://localhost:27017/mobileUser",
  apiURL: "http://localhost:4000/",
  userJwtKey: process.env.USER_JWT_KEY,
  cryptoKey: process.env.CRYPTO_KEY,
  nodeENV: process.env.NODE_ENV,
};
