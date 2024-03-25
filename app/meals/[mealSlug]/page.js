import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug); //~ directly reach out to the database

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary
  };
}

//~ 'params' props passed from nextjs. it's a key-value pairs of 'mealSlug: the path on url'
const MealDetailsPage = ({ params }) => {
  const meal = getMeal(params.mealSlug);
  console.log(meal);

  if (!meal) {
    //~ will STOP this page from rendering and will SHOW the closest not-found or error page
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br/>');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        >
        </p>
      </main>
    </>
  );
};

export default MealDetailsPage;