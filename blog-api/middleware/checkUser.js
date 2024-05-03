const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "tapan12345");
    console.log(verify);
    if (verify.userType == "user") {
      next();
    } else {
      return res.status(401).json({ msg: "Invalid user" });
    }
  } catch (error) {
    return res.status(501).json({ msg: "Authorization invalid" });
  }
};
