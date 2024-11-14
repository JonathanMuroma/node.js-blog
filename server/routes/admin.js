const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authentication");

const adminController = require("../controllers/adminController");

router.get("/admin", adminController.admin_index);

router.post("/admin", adminController.admin_login);

router.get("/dashboard", authMiddleware, adminController.admin_dashboard);

router.get("/add-post", authMiddleware, adminController.admin_add_post_get);

router.post("/add-post", authMiddleware, adminController.admin_add_post_post);

router.get(
  "/edit-post/:id",
  authMiddleware,
  adminController.admin_edit_post_get
);

router.put(
  "/edit-post/:id",
  authMiddleware,
  adminController.admin_edit_post_put
);

router.delete(
  "/delete-post/:id",
  authMiddleware,
  adminController.admin_delete_post
);

router.get("/logout", adminController.admin_logout);

router.post("/register", adminController.admin_register);

module.exports = router;
