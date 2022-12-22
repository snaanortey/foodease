import { Button } from '@material-tailwind/react';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import close_icon from '../../public/assets/icons/icons8-close-window-50.png';
import search_icon from '../../public/assets/icons/icons8-search-30.png';
import RecipeItem, { IRecipeItem } from '../recipeItem/RecipeItem';
import styles from './SearchIngredient.module.css';
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
      <div className={`${styles.container} first:max-w-xs`}>
        <h2 className="text-left">Not sure what to cook?</h2>
        <h1 className="text-left">Type your ingredients and find a recipe!</h1>
        <div className={`${styles.search} flex flex-col max-w-xs`}>
          <div className="relative w-full border-y-8">
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
              className={`w-full p-2 pl-8 border-teal-500 border-spacing-4 border-2 rounded-xl dark:md:hover:placeholder-fuchsia-600`}
            ></input>
          </div>
          <div className="flex gap-4 flex-wrap">
            {ingredientList.map((ingredient, index) => (
              <Button className="" key={index} size="sm">
                {ingredient}
                <Image
                  src={close_icon}
                  alt="close icon"
                  className="pl-2"
                  onClick={() => deleteIngredient(index)}
                ></Image>
              </Button>
            ))}
          </div>
          <Button onClick={getRecipesHandler} variant="text">
            Get Recipes
          </Button>
        </div>

        {recipeList.map((recipe, index) => (
          <div key={index} className="flex flex-wrap">
            <RecipeItem {...recipe} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchIngredient;
