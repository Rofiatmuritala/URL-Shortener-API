import express, { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";
import { userMeHandler } from "../controllers/userController.js";
import { usersRouteMiddleware } from "../middlewares/userMiddleware.js";

const router = Router();

router.post("/api/users/register", async (req, res) => {
  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  console.log(user);

  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "30d" });

  console.log(token);

  // const user = await User.create(req.body);

  res.status(201).json({ token: token });
});

router.post("/api/users/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  console.log(user);

  // if (req.body.password === user.password) {
  //   console.log("password match");
  // } else {
  //   console.log("Password does not match");
  // }

  if (user === null) {
    console.log("Error: Invalid credentials");
  }
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordMatch === false) {
    console.log("Error: Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "30d" });

  console.log(token);

  // const user = await User.create(req.body);

  res.status(201).json({ token: token });
});

router.get("/api/users/me", usersRouteMiddleware, userMeHandler);

router.get("/logout", function (req, res, next) {
  // If the user is loggedin
  if (req.token.loggedin) {
    req.token.loggedin = false;
    res.redirect("/");
  } else {
    // Not logged in
    res.redirect("/");
  }
});

export default router;
