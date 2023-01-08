import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import fileUpload from "express-fileupload";
import passport from "passport";
import getIngredientsById from "../src/routes/getIngredientsById";
import imageSearch from "../src/routes/imageSearch";
import ingredientsToRecipes from "../src/routes/ingredientsToRecipes";
import userLogin from "../src/routes/login";
import searchAndSuggestMeals from "../src/routes/searchAndSuggestMeals";
import userRegistration from "../src/routes/userRegistration";
import secret from "./routes/profile";
import recommendedRecipes from "./routes/getRecommendedRecipes";

const app = express();

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.options('*', cors()); //  cors to allow the client send a preflight request
app.use(fileUpload({ createParentPath: true }));

app.use("/ingredients", getIngredientsById);
app.use("/image/ingredients", imageSearch);
app.use("/recipes/search", ingredientsToRecipes);
app.use("/meals/search", searchAndSuggestMeals);
app.use("/register", userRegistration);
app.use("/login", userLogin);
app.use("/recommendedRecipes", recommendedRecipes);


// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/profile", passport.authenticate("jwt", { session: false }), secret);

export { app };
