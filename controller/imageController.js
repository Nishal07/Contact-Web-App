const path = require("path");
const pool = require("../db");
const setProfile = async (req, res, next) => {
  const id = req.params.id * 1;
  const image = req.file;
  const imageData = image.path;
  try {
    const query =
      "INSERT INTO contactsprofiles (profile_name, profile_url,contact_id) VALUES ($1, $2, $3)";
    const values = [image.originalname, imageData, id];
    await pool.query(query, values);
    res.send("Image Upload Succesfully!");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
  next();
};

module.exports = { setProfile };
