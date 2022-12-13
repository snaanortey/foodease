import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import "express-async-errors";
import bodyParser from "body-parser";
import getIngredientsById from "../src/routes/getIngredientsById";
import imageSearch from "../src/routes/imageSearch";
import ingredientsToRecipes from "../src/routes/ingredientsToRecipes";
import searchAndSuggestMeals from "../src/routes/searchAndSuggestMeals";
import userRegistration from "../src/routes/userRegistration";
import userLogin from "../src/routes/login";
import secret from "../src/routes/secret";
import passport from "passport";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({ createParentPath: true }));

app.use("/ingredients", getIngredientsById);
app.use("/image/ingredients", imageSearch);
app.use("/recipes/search", ingredientsToRecipes);
app.use("/meals/search", searchAndSuggestMeals);
app.use("/register", userRegistration);
app.use("/login", userLogin);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/secret", passport.authenticate("jwt", { session: false }), secret);

export { app };
