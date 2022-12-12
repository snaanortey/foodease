import express, { RequestHandler } from "express";
import { ValidationResult, validateNewUser } from "../utils/validation";
import { UserService } from "../services/userService";

const router = express.Router();

const userService = new UserService();

const routerHandler: RequestHandler = async (req, res) => {
  try {
    // Pass req.body to the funtion to validate
    const result: ValidationResult = validateNewUser(req.body);

    if (result.success === false) {
      res.status(400).send(result.message);
      return;
    }

    await userService.save(req.body);

    // Send successful registration response and status 201 to user
    res.status(201).send("Registration successful.");
  } catch (err) {
    console.log(err);
    res.status(500).send("failed to register user in database.");
  }
};

router.post("/", routerHandler);

export default router;
