const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const pool = require("../db");
const { Pool } = require("pg");

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        Error: "You are not logged in !! Please log-in to get access",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [decoded.id]
    );
    const user = currentUser.rows[0];
    if (!user) {
      return res.status(401).json({
        message: "The user belongs to the token does not longer exist!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  protect,
};
