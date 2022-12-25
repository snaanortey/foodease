import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../page';
import Image from 'next/image';
import favorite from '../../public/assets/icons/icons8-bookmark-50.png';
import close_icon_no_border from '../../public/assets/icons/icons8-close-50.png';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './FullRecipe.module.css';

export interface IFullRecipe {
  title: string;
  ingredients: string[];

  instructions: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipeId = context.query['recipeId'];
  const response = await fetch(`http://localhost:8000/ingredients/${recipeId}`);

  const recipe = await response.json();

  return {
    props: {
      ...recipe,
    },
  };
};

const FullRecipe: NextPageWithLayout<IFullRecipe> = (prop) => {
  return (
    <div className={`m-8 bg-gray-200 border-transparent rounded-t-2xl`}>
      <Image
        className="w-full h-80 relative border-transparent rounded-t-2xl rounded-b-lg"
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        alt="food"
        width={80}
        height={40}
        priority={true}
      />
      <Image
        className="absolute top-12 bg-white right-12 border-transparent border-4 rounded-md"
        src={favorite}
        alt="favorite icon"
        width={30}
        height={30}
      />
      <Link href="/">
        <Image
          className="absolute top-12 bg-white left-12 border-transparent border-4 rounded-md object-cover"
          src={close_icon_no_border}
          alt="close icon"
          width={30}
          height={30}
        />
      </Link>

      <div className="flex flex-col items-center">
        <div
          className={`w-11/12 py- px-4 border-transparent border-4 rounded-lg bg-white ${styles.ingredients}`}
        >
          <h1 className="pb-4 decoration-8">{prop.title}</h1>
          <h2>Ingredients</h2>
          {prop.ingredients.map((ingredient, i) => (
            <h3 key={i} className="pt-2">
              {ingredient}
            </h3>
          ))}
        </div>
        <div className="p-8">
          {prop.instructions.split('. ').map((line, i) => {
            let color = '';
            (i + 2) % 2 === 0
              ? (color = 'text-cyan-600')
              : (color = 'text-amber-800');

            return (
              <div key={i} className="pt-2">
                <h3 className={`py-2 ${color}`}>Step {i + 1}</h3>

                <h3>{line}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FullRecipe;

FullRecipe.getLayout = (page) => page;
