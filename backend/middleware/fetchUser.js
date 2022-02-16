let jwt = require("jsonwebtoken");
const JWT_SECRET = "itsgonnabeoursecret";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "please login first!" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user
    next();
  } catch {
    res.status(401).json({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
