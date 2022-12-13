// This route was created to test that the JWT-token works when being used to access a secure route

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "hello world",
    user: req.user,
  });
});

export default router;
