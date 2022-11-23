import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchMeals from "../../Components/SearchMeals/SearchMeals";
import shoppinglistImage from "../../assets/images/shoppinglist1.jpeg";
import "./ShoppingList.scss";

interface RecipesForShoppingList {
    ingredients: string[];
    picture_link: string;
    instructions: string;
    title: string;
}

export default function ShoppingList() {
  const params = useParams();
  const { mealId } = params;
  const [recipe, setRecipe] = useState<RecipesForShoppingList>();

  const getRecipeById = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/ingredients/${mealId}`
    );

    setRecipe(data);
  };

  useEffect(() => {
    getRecipeById();
  }, [mealId]);

  if (!recipe) {
    return <p>Loding shopping list...</p>;
  }

  return (
    <section className="shoppinglist">
      <div className="shoppinglist__wrap">
        <div className="shoppinglist__containerOne">
          <img
            className="shoppinglist__image"
            src={shoppinglistImage}
            alt="grocery"
          />
        </div>
        <div className="shoppinglist__containerTwo">
          <h3 className="shoppinglist__heading">
            Shopping List for{" "}
            <span className="shoppinglist__mealname">{recipe.title}</span>
          </h3>
          <SearchMeals />
          <div className="shoppinglist__list">
            {recipe.ingredients.map((ingredient, i) => (
              <div key={i} className="shoppinglist__item">
                <div>
                  <p className="shoppinglist__list-icon">🛒</p>
                </div>
                <p className="shoppinglist__ingredient" key={i}>
                  {ingredient}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
