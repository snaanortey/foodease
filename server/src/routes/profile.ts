// This route was created to test that the JWT-token works when being used to access a secure route

import express from "express";
import { UserService } from "../../src/services/userService";

const router = express.Router();

const userService = new UserService();

router.get("/", async (req, res) => {
  // req.user is to access the user object from user's data stored in JWT.
  // refer to login.ts file lines 65 - 66
  const userData = await userService.findByEmail((req.user as any).email);

  res.json(userData);
});

export default router;
