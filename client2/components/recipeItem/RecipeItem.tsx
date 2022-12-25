import styles from './RecipeItem.module.css';
import Link from 'next/link';
import Image from 'next/image';

export interface IRecipeItem {
  id: string;
  title: string;
  imageUrl: string;
}

const RecipeItem: React.FC<IRecipeItem> = ({ title, imageUrl, id }) => {
  return (
    <Link
      href={`/fullRecipe?recipeId=${id}`}
      className={`${styles.link} border rounded-xl mb-6 justify-self-auto drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]`}
    >
      <Image
        className="w-11/12 h-3/5 border rounded-xl place-content-center m-auto mt-1 object-"
        src={imageUrl}
        alt="recipe picture"
        width={80}
        height={80}
      />
      <div className="h-2/5 pt-2 px-2">
        <h3 className="w-full h-full text-xs">{title}</h3>
      </div>
    </Link>
  );
};

export default RecipeItem;
