const jwt = require("jsonwebtoken");
const path = require("path");
const { promisify } = require("util");
const pool = require("../db");
const validator = require("validator");

const createContact = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  const { contact_name, contact_email, contact_number, image } = req.body;
  try {
    if (!validator.isEmail(contact_email)) {
      return res.status(400).json({
        error: "Please Provide Valid Email!",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const query =
      "INSERT INTO contacts(contact_name,User_Id,contact_email,contact_number) VALUES ($1, $2, $3,$4)";
    const values = [contact_name, decoded.id, contact_email, contact_number];
    const contact = await pool.query(query, values);
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllContact = async (req, res, next) => {
  const id = req.params.id * 1;
  try {
    const query =
      "SELECT contact_name,contact_number FROM contacts WHERE user_id = $1";
    const values = [id];
    const result = await pool.query(query, values);
    res.status(200).json({
      message: "success",
      numbersOfContacts: result.rows.length,
      data: result.rows,
    });
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateContact = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const { contact_name, contact_number, contact_email } = req.body;

  try {
    if (!validator.isEmail(contact_email)) {
      return res.status(400).json({
        error: "Please Provide Valid Email!",
      });
    }
    const query =
      "UPDATE contacts SET contact_name = $1, contact_number = $2, contact_email = $3 WHERE contact_id = $4";
    const values = [contact_name, contact_number, contact_email, id];
    const updatedData = await pool.query(query, values);
    res.status(202).json({
      message: "succes",
      data: updatedData.rows,
    });
    next();
  } catch (error) {
    console.log(error.message);
    res.status(204).json({
      message: error.message,
    });
  }
};

const deleteContact = async (req, res, next) => {
  console.log(req.headers);
  const id = req.params.id;
  try {
    const query = "DELETE FROM contacts WHERE contact_id = $1";
    await pool.query(query, [id]);
    res.status(204).json({
      message: "success",
      data: null,
    });
    next();
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  updateContact,
  getAllContact,
  deleteContact,
};
