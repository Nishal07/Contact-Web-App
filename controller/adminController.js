const pool = require("../db");
const getAllUser = async (req, res, next) => {
  try {
    const query = "SELECT user_name,email FROM users";

    const user = await pool.query(query);
    const result = user.rows;
    res.status(200).json({
      message: "success",
      data: result,
    });
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const query1 = "DELETE FROM users WHERE user_id = $1 RETURNING user_Id";
    await pool.query(query1, [id]);
    res.status(200).json({
      message: "success",
    });
    next();
  } catch (error) {
    console.log(error, "-------,-----------------------");
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getOneUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const queryForUser = "SELECT user_name,email FROM users WHERE user_id = $1";
    const user = await pool.query(queryForUser, [id]);
    const queryForContacts =
      "SELECT contact_name,contact_number FROM contacts WHERE user_id = $1";
    const contactsOfThatUser = await pool.query(queryForContacts, [id]);
    res.status(200).json({
      message: "success",
      user: user.rows,
      contacts: contactsOfThatUser.rows,
    });
    next();
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllUser,
  deleteUser,
  getOneUser,
};
