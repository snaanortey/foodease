import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { NextPageWithLayout } from '../page';
import pepper from '../../public/assets/images/pepper.avif';
import add from '../../public/assets/icons/icons8-add-64.png';
import Image from 'next/image';
import styles from './ShoppingList.module.css';

export interface IShoppingList {
  ingredients: string[];
  picture_link: string;
  instructions: string;
  title: string;
}

const ShoppingList: NextPageWithLayout = () => {
  const router = useRouter();
  const { recipeId } = router.query;
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  axios
    .get(`http://localhost:8000/ingredients/${recipeId}`)
    .then((response) => {
      setShoppingList(response.data.ingredients);
    })
    .catch((err) => {
      console.log(err);
    });

  if (!shoppingList) {
    <p>Shopping list is loading...</p>;
  }

  return (
    <div className={`px-8 py-6 ${styles.container}`}>
      <input
        placeholder="type a meal, get your shopping list"
        className={`bg-gray-200 w-full p-2 border-teal-500 border-spacing-4 border-2 rounded-xl dark:md:hover:placeholder-fuchsia-600
              hover:bg-slate-400 hover:cursor-pointer mb-8`}
      ></input>
      {shoppingList.map((ingredient, i) => (
        <div key={i} className="flex my-4 content-baseline w-full">
          <Image
            src={pepper}
            alt="pepper"
            width={60}
            height={60}
            className="border rounded-md mr-4"
          />

          <div className="flex justify-between items-center w-3/4">
            <h3>{ingredient}</h3>
            <Image
              src={add}
              alt="favourite"
              width={20}
              height={10}
              className="border rounded-md w-8 h-8 p-1 bg-gray-200 ml-4"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;

ShoppingList.getLayout = (page) => page;
