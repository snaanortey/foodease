import styles from './SearchIngredient.module.css';
import Image from 'next/image';
import search_icon from '../../public/assets/icons/icons8-search-30.png';
export interface ISearchIngredient {}

const SearchIngredient: React.FC<ISearchIngredient> = () => {
  return (
    <div className="relative w-4/5">
      <Image
        className="absolute top-3 left-2"
        src={search_icon}
        alt="search icon"
        width={20}
        height={20}
      />
      <input
        placeholder="Type your ingredients"
        className={`w-full p-2 pl-8 border-teal-500 border-spacing-4 border-2 rounded-xl dark:md:hover:placeholder-fuchsia-600`}
      ></input>
    </div>
  );
};

export default SearchIngredient;
