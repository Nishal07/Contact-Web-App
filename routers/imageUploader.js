const multer = require("multer");
const path = require("path");
const imageController = require("../controller/imageController");
const authController = require("../controller/authController");
const { Router } = require("express");
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Images");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

///Route for image Uploading
router.post(
  "/:id/uploadProfile",
  upload.single("image"),
  authController.protect,
  imageController.setProfile
);

module.exports = router;
