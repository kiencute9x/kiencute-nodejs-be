import express from "express";
import { body, validationResult } from "express-validator";
import { userControllers } from "../controllers/index.js";

const router = express.Router();

router.get("/:id", userControllers.findUserById);

router.post("/login",body("email").isEmail(),body("password").isLength({ min: 5 }),userControllers.login);

router.post("/register", userControllers.register);

router.put('/update/:id', userControllers.updateUserById);

router.delete('/delete/:id', userControllers.deleteUserById);


export default router;
