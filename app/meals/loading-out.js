import classes from './loading.module.css';

//* 'loading.js' is a RESERVED FILENAME
export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}