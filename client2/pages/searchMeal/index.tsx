import { NextPageWithLayout } from '../page';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export interface ISearchMeal {
  id: string;
  title: string;
}

const SearchMeal: NextPageWithLayout<ISearchMeal> = () => {
  const [suggestedMeal, setSuggestedMeal] = useState<ISearchMeal[]>([]);

  const getSuggestedMeal: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const mealName = e.target.value;

    if (mealName.length >= 3) {
      const { data } = await axios.get(
        `http://localhost:8000/meals/search?query=${mealName}`
      );

      setSuggestedMeal(data);
    }

    if (mealName.length <= 2) {
      setSuggestedMeal([]);
    }
  };

  return (
    <div className="m-4">
      <input
        placeholder="type a meal, get your shopping list"
        onChange={getSuggestedMeal}
        className={`bg-gray-200 w-full p-2 border-teal-500 border-spacing-4 border-2 rounded-xl dark:md:hover:placeholder-fuchsia-600
              hover:bg-slate-400 hover:cursor-pointer`}
      ></input>
      <div>
        {suggestedMeal.map((meal, i) => (
          <Link key={i} href={`/shoppingList/${meal.id}`}>
            <h3>{meal.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchMeal;

SearchMeal.getLayout = (page) => page;
