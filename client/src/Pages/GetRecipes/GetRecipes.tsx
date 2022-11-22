import React from 'react';
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import upload from "../../assets/images/upload.png";
import RecipesSummary from '../../Components/RecipesSummary/RecipesSummary';
import { Recipes } from '../../types';

export default function GetRecipes() {
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipes[]>([]);

  const getIngredientsViaImage: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const inputElement = e.target;

    const fileName = e.target.value;

    let formdata = new FormData();

    // This is to cater for when inputElement.files is null
    if(inputElement.files===null) {
      return
    }

    formdata.append("image", inputElement.files[0], fileName);

    const { data } = await axios.post(
      "http://localhost:8000/image/ingredients",
      formdata
    );

    // Prevents array from having duplicate values
    const newArray = Array.from(new Set([...ingredientList, ...data]).values());

    setIngredientList(newArray);
  };

  // Adds typed ingredient to ingredient array when the Enter key is pressed
  const pressEnterKey: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    // e.preventDefault();
    // Adds value in input button to ingredientLists state after the enter key is typed
    if (e.key === "Enter") {
      // e.target for a key press is not recogniised as a html input element, so we have to 
      // set the type as such
      const target = e.target as HTMLInputElement;
      const typedInput = target.value;
      const newValue = Array.from(
        new Set([...ingredientList, typedInput]).values()
      );
      setIngredientList(newValue);
      target.value = "";
    }
  };

  // Removes ingredient from array when the delete button is clicked
  const deleteIngredient = (index: number) :void => {
    const filteredArray = ingredientList.filter((_, i) => i !== index);
    setIngredientList(filteredArray);
  };

  // Calls the API that returns list of recipes when the form is submitted
  const getRecipesHandler: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    const { data } = await axios.post(
      "http://localhost:8000/recipes/search",
      ingredientList
    );

    setRecipes(data);
  };

  return (
    <>
      <div className="searchrecipes">
        <div className="searchrecipes__wrapOne">
          <div>
            <h2 className="searchrecipes__title">Not sure what to cook?</h2>
            <ul className="searchrecipes__heading-div">
              <li className="searchrecipes__heading">
                Upload pic(s) of your ingredients
              </li>
              <li className="searchrecipes__heading">Type your ingredients</li>
              <li className="searchrecipes__heading">Find a recipe to cook!</li>
            </ul>
          </div>

          <div className="searchrecipes__allinputs">
            <div className="searchrecipes__container-upload">
              <input
                className="searchrecipes__container"
                onChange={getIngredientsViaImage}
                type="file"
                accept="image/*"
                id="upload-button"
              />
              <label
                className="searchrecipes__uploadlabel"
                htmlFor="upload-button"
              >
                UPLOAD IMAGES
              </label>

              <img
                className="searchrecipes__uploadimage"
                src={upload}
                alt="upload icon"
              />
            </div>

            <div className="searchrecipes__container-searchtext">
              <input
                className="searchrecipes__input"
                placeholder="Type your ingredients"
                onKeyDown={pressEnterKey}
              ></input>
            </div>
          </div>
          <div className="searchrecipes__ingredientsArray">
            {ingredientList.map((ingredient, index) => (
              <button
                className="searchrecipes__ingredientsArray-button"
                key={index}
              >
                {ingredient}
                <span
                  className="searchrecipes__ingredientsArray-delete"
                  onClick={() => deleteIngredient(index)}
                >
                  x
                </span>
              </button>
            ))}
          </div>
          <button className="searchrecipes__button" onClick={getRecipesHandler}>
            GET RECIPE
          </button>
        </div>
        <div className="searchrecipes__wrapTwo">
          <div>
            <div className="searchrecipes__results">
              {recipes.map((recipe, i) => (
                <div className="searchrecipes__summary" key={i}>
                  <Link to={`/recipe/${recipe.id}`}>
                    <RecipesSummary
                      recipe={recipe} 
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
