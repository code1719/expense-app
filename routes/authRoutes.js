import { Express } from "express";
import * as authController from "controllers/authController.js";
import requireAuth from "../middlewares/requireAuth";

const router = express.Router();

router.get("/whoami", requireAuth, authController.auth_user);
router.post("/auth", authController.auth_login);
router.post("/logout", requireAuth, authController.auth_logout);
router.post("/register", authController.auth_register);

export default router;