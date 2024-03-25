'use client';

import { useFormState } from 'react-dom';

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

export default function ShareMealPage() {
  /** //* useFormState(1st arg, 2nd arg)
   * ~ managing the state of this component that uses form that will be submitted with help of server action
   * ~ 1st arg: server action, 2nd arg: initial state (any value)
   * ~ 'formAction' passed to form 'action' attribute instead of passing 'shareMeal'
   * ~ 'state' will be the response we got back from shareMeal or initial state
   * ~ useFormState() will PASS two parameters to shareMeal(): 1st is previous state, 2nd is the submitted data
   */
  const [state, formAction] = useFormState(shareMeal, { message: null, errors: [] });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"

            ></textarea>
          </p>
          <ImagePicker label="Your Image" name="image" />
          {state.errors && (
            <ul>
              {Object.values(state.errors).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}