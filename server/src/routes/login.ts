import { config } from "dotenv";
config();
import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import { UserService } from "../services/userService";
import { EntityNotFoundError } from "typeorm";
import jwt from "jsonwebtoken";
import { Strategy, ExtractJwt } from "passport-jwt";

const router = express.Router();

const userService = new UserService();

// This link proviides more details on workflow: https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport

// This verify function takes the user's email and password as reqs in the API endpoint and
// confirms that username exists in db, and also that password matches user's hashed password
const verify: VerifyFunction = function (email, password, callback) {
  //Fetch user from database
  const userDataPromise = userService.findByEmail(email);
  userDataPromise
    .then((userData) => {
      bcrypt
        .compare(password, userData.passwordHash)
        .then((matchPassword) => {
          if (!matchPassword) {
            return callback(null, false, {
              message: "Incorrect username or password.",
            });
          }
          return callback(null, userData);
        })
        .catch((err) => {
          return callback(err);
        });
    })
    // findByEmail threw an error
    .catch((err) => {
      // if  user not found
      if (err instanceof EntityNotFoundError) {
        return callback(null, false, {
          message: "Incorrect username or password.",
        });
      }
      // other arbitrary error
      return callback(err);
    });
};

passport.use(new LocalStrategy(verify));

// Returns a token to a user if login is successful
router.post("/", async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error has occured");
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (process.env.JWT_KEY === undefined) {
          throw console.error("environment variables do not exist");
        }
        if (error) return next(error);
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_KEY);
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Extracts JWT token from header of http request and checks that the token had been signed
// with the correct secretOrKey. If confirmed, user details are passed to the next middleware
passport.use(
  new Strategy(
    {
      secretOrKey: process.env.JWT_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token: any, done: any): Promise<any> => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default router;
