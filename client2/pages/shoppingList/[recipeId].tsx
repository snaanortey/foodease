import Image from 'next/image';
import { useRouter } from 'next/router';
import add from '../../public/assets/icons/icons8-add-64.png';
import pepper from '../../public/assets/images/pepper.avif';
import { backendService } from '../../services/backend';
import { NextPageWithLayout } from '../page';
import styles from './ShoppingList.module.css';
import useSWR from 'swr';
import Error from '../../components/error/Error';
import { RecipePerMealSelected } from '../../types';

const ShoppingList: NextPageWithLayout<RecipePerMealSelected> = () => {
  const router = useRouter();
  const { recipeId } = router.query;

  const { data, error } = useSWR(recipeId, backendService.getRecipebyId);

  if (!error && !data) {
    return <p>Shopping list is loading...</p>;
  }

  if (error || !data?.ingredients) {
    return <Error />;
  }

  const shoppingList = data.ingredients;

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
