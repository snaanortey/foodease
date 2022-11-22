import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import "express-async-errors";
import { config } from "dotenv";
import bodyParser from "body-parser";
config();
import getIngredientsById from "../src/routes/getIngredientsById";
import imageSearch from "../src/routes/imageSearch";
import ingredientsToRecipes from "../src/routes/ingredientsToRecipes";
import searchAndSuggestMeals from "../src/routes/searchAndSuggestMeals";

const app = express();
const PORT: number = parseInt(process.env.PORT || "8000");

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({ createParentPath: true }));

app.use("/ingredients", getIngredientsById);
app.use("/image/ingredients", imageSearch);
app.use("/recipes/search", ingredientsToRecipes);
app.use("/meals/search", searchAndSuggestMeals);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
