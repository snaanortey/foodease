import Head from 'next/head';
import SearchRecipes from '../components/searchRecipes/SearchRecipes';

export default function Home() {
  return (
    <>
      <Head>
        <title>Foodease</title>
        <meta name="description" content="A food waste reduction app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

      <SearchRecipes />
    </>
  );
}
