const jwt = require("jsonwebtoken");
const jwt_Secret = "yehnhbatasakta";

const fetchuser = (req, res, next) => {
  // Get user from jwt token and add id to req
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Please authenticate with valid credentials" });
  }
  try {
    const data = jwt.verify(token, jwt_Secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token, please authenticate with valid credentials" });
  }
};

module.exports = fetchuser;
