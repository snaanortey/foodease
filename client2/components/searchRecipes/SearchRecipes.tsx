import { Button } from '@material-tailwind/react';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import close_icon from '../../public/assets/icons/icons8-close-window-50.png';
import search_icon from '../../public/assets/icons/icons8-search-30.png';
import RecipeItem, { IRecipeItem } from '../recipeItem/RecipeItem';
import styles from './SearchRecipes.module.css';
export interface ISearchIngredient {}

const SearchIngredient: React.FC<any> = () => {
  const [ingredientList, setIngredientList] = useState<string[]>([]);

  const pressEnterKey: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      const typedInput = target.value;
      console.log(typedInput);
      const newValue = Array.from(
        new Set([...ingredientList, typedInput]).values()
      );
      setIngredientList(newValue);
      target.value = '';
    }
  };

  //Removes ingredient from array when the delete button is clicked
  const deleteIngredient = (index: number): void => {
    const filteredArray = ingredientList.filter((_, i) => i !== index);
    setIngredientList(filteredArray);
  };

  const [recipeList, setRecipeList] = useState<IRecipeItem[]>([]);

  // Calls the API that returns list of recipes when the form is submitted
  const getRecipesHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const { data } = await axios.post(
      'http://localhost:8000/recipes/search',
      ingredientList
    );
    setRecipeList(data);
  };

  return (
    <>
      <div className={`${styles.container} w-full lg:w-9/12 lg:mx-auto p-8`}>
        <h2 className="pb-2">Not sure what to cook?</h2>
        <h2 className="pb-4">Type your ingredients and find a recipe!</h2>
        <div
          className={`${styles.search} flex flex-col items-center w-full lg:w-9/12`}
        >
          <div className="relative w-full">
            <Image
              className="absolute top-3 left-2"
              src={search_icon}
              alt="search icon"
              width={20}
              height={20}
            />
            <input
              placeholder="Type your ingredients"
              onKeyDown={pressEnterKey}
              className={`bg-gray-200 w-full p-2 pl-8 border-teal-500 border-spacing-4 border-2 rounded-xl dark:md:hover:placeholder-fuchsia-600
              hover:bg-slate-400 hover:cursor-pointer`}
            ></input>
          </div>
          <div className="flex flex-wrap my-2">
            {ingredientList.map((ingredient, index) => (
              <button
                key={index}
                className="flex flex-wrap mr-2 my-1 uppercase px-2 py-1 rounded-full border border-yellow-800 text-yellow-800 max-w-max shadow-sm hover:shadow-lg"
              >
                <h3 className="" key={index}>
                  {ingredient}
                </h3>{' '}
                <span>
                  <Image
                    src={close_icon}
                    alt="close icon"
                    width={30}
                    height={30}
                    className="pl-2"
                    onClick={() => deleteIngredient(index)}
                  ></Image>
                </span>
              </button>
            ))}
          </div>
          <Button
            onClick={getRecipesHandler}
            className="button button-pink mr-3 mb-4"
            data-ripple-light="true"
          >
            Get Recipes
          </Button>
        </div>
        <div className="flex flex-wrap justify-evenly">
          {recipeList.map((recipe, index) => {
            return <RecipeItem key={index} {...recipe} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SearchIngredient;
