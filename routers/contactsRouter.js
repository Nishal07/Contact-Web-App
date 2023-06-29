const { Router } = require("express");
const contactController = require("../controller/contactsController");
const authController = require("../controller/authController");
const router = Router();

router.get(
  "/:id/getAllContact",
  authController.protect,
  contactController.getAllContact
);
router.post(
  "/createContact",
  authController.protect,
  contactController.createContact
);

router.patch(
  "/updateContact/:id",
  authController.protect,
  contactController.updateContact
);

router.delete(
  "/deleteContact/:id",
  authController.protect,
  contactController.deleteContact
);

module.exports = router;
