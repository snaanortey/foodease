import React from 'react';
import SearchMeal from '../../Components/SearchMeals/SearchMeals';
import "./GetShoppingList.scss";

export default function SearchIngredients() {
  return (
    <div className="searchIngredients">
      <div className="searchIngredients__container">
        <h3 className="searchIngredients__heading">Got a Meal in Mind?</h3>
        <h4 className="searchIngredients__text"> Get your shopping list</h4>
      </div>
      <div className="searchIngredients__container">
        <SearchMeal />
      </div>
    </div>
  );
}

