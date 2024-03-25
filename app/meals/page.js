import Link from "next/link";
import classes from './page.module.css';
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

export const metadata = {
  title: 'All Meals',
  description: 'Browse all meals available here.',
};

/**
 * * Since it's a server-component, we can DIRECTLY REACH out to the DATABASE from here without having to make a request in the client-side (e.g useEffect).
 * * Server-component can be CONVERTED to ASYNC FUNCTION
 */
const Meals = async () => {
  console.log('Fetching meals...');
  //~ no need useEffect here
  // const meals = await getMeals();
  const meals = await fetch('http://localhost:3000/api/images').then((res) => res.json());
  // console.log(meals);
  //* component that used to data fetching & returns a promise like this, will trigger <Suspense> to show fallback until the promise is resolved

  console.log(meals);
  return;
  // return <MealsGrid meals={meals} />;

  /** //! after npm run build, this function is NOT EXECUTING anymore because those pages were pre-generated & cached. That's a problem if the data that's visible on that page CHANGES, we can't see the latest data
   * ! The dynamic page IS NOT pre-generated
   * * SOLUTION: tell nextjs to throw away its cache whenever we add a new meal
   * ~ use revalidatePath() after saveMeal() in server action file
   */
};

//~ MAIN COMPONENT
const MealsPage = () => {
  //* Here we OUTSOURCED the data fetching part into a separate component, so we can use <Suspense>
  return (
    <>
      <header className={classes.header}>
        <h1>Delicious meals, created <span className={classes.highlight}>by you</span></h1>
        <p>Choose your favorite recipe and cook it yourself. It is easy!</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>

      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>
        }>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;