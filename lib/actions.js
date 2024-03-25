'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

/** //* 'SERVER ACTION'
 * * which a FUNCTION that executes only on the server. MUST add the 'async' keyword
 * * passed to form action attribute
 * * AUTOMATICALLY receive formData that was submitted
 * ! It is NOT ALLOWED to have server actions in client-component file
 * ~ We can store server action in separate file, like this. 'use server' is needed!
 */

function isInvalidText(text) {
  return !text || text.trim() === '';
}

//* useFormState() will pass two parameters to shareMeal(): 1st is previous state, 2nd is the submitted data
export async function shareMeal(prevState, formData) {
  // 'use server'; //~ in case we store this fn in component

  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };
  // console.log(meal);

  let errors = {};
  if (isInvalidText(meal.title)) {
    errors.title = 'Invalid title';
  }

  if (isInvalidText(meal.summary)) {
    errors.summary = 'Invalid summary';
  }

  if (isInvalidText(meal.instructions)) {
    errors.instructions = 'Invalid instructions';
  }

  if (isInvalidText(meal.creator)) {
    errors.creator = 'Invalid creator';
  }

  if (isInvalidText(meal.creator_email) || !meal.creator_email.includes('@')) {
    errors.creator_email = 'Invalid email';
  }

  if (!meal.image || meal.image.size === 0) {
    errors.image = 'Invalid image';
  }

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return {
      message: "Invalid input - BE",
      errors
    };
  }

  await saveMeal(meal);
  /** //? Solution for nextjs caching after build for production
   * * throws away the cache that belongs to a certain route path.
   * ~ By default, only that path will we revalidated, not including nested path
   * ~ revalidatePath('/meals', 'layout') for nested pages
   * ~ revalidatePath('/meals', 'page') for that one page
   */
  revalidatePath('/meals', 'page');
  redirect('/meals');

  // if (
  //    isInvalidText(meal.title) ||
  //    isInvalidText(meal.summary) ||
  //    isInvalidText(meal.instructions) ||
  //    isInvalidText(meal.creator) ||
  //    isInvalidText(meal.creator_email) ||
  //    !meal.creator_email.includes('@') ||
  //    !meal.image || meal.image.size === 0
  // ) {
  //    return {
  //       message: "Invalid input - BE"
  //    };
  //    // throw new Error('Invalid input - BE');
  // }


}