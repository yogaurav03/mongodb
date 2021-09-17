const { verifyJwt } = require("../common/index");
const userAuthCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await verifyJwt(token);
    if (decoded) {
      req.tokenData = decoded;
      next();
    } else {
      res.send({
        code: 401,
        msg: "Authentication failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      code: 401,
      msg: "Authentication failed",
    });
  }
};
module.exports = userAuthCheck;