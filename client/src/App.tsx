import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/HomePage";
import GetRecipes from "./Pages/GetRecipes/GetRecipes";
import RecipeDetails from "./Pages/RecipeDetails/RecipeDetails";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import GetShoppingList from "./Pages/GetShoppingList/GetShoppingList";
import ShoppingList from "./Pages/ShoppingList/ShoppingList";

// To migrate fontawesome icons
library.add(far);

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/getRecipes" element={<GetRecipes />}></Route>
          <Route path="/recipe/:recipeId" element={<RecipeDetails />}></Route>
          <Route path="/getShoppingList" element={<GetShoppingList />}></Route>
          <Route path="/ingredients/:mealId" element={<ShoppingList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
