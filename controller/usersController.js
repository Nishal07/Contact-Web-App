const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const signup = async (req, res, next) => {
  const { user_name, email, password } = req.body;
  try {
    if (!user_name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide user_name, email, and password" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        error: "Please Provide Valid Email!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING user_Id";
    const values = [user_name, email, hashedPassword];
    const result = await pool.query(query, values);

    const userId = result.rows[0].user_id;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIERS_IN,
    });
    res.status(200).json({
      message: "success",
      token,
    });
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        error: "Please Provide Email & Password!",
      });
    }
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        error: "Incorrect Email or Password ! ",
      });
    }
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIERS_IN,
    });
    res.status(200).json({
      message: "success",
      token,
    });
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
