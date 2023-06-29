const { Router } = require("express");
const adminController = require("../controller/adminController");
const router = Router();

router.get("/getAllUsers", adminController.getAllUser);
router.get("/getOneUser/:id", adminController.getOneUser);
router.delete("/deleteUser/:id", adminController.deleteUser);

module.exports = router;
