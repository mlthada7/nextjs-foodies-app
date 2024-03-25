//* here's the code that REACHES OUT to a database and gets/sets the data

import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); //~ just for delays to see the code in action, so we use async function
  // throw new Error('loading meals failed');
  return db.prepare('SELECT * FROM meals').all(); //~ this code normally not return a function, BUT we use async function so it returns a promise
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instruction = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}${Date.now()}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);

  const bufferedImage = await meal.image.arrayBuffer(); //~ arrayBuffer return a promise
  //~ with that we wrote the image to the stream path
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed - BE');
    }
  });

  //~ store the overall data in db
  meal.image = `/images/${fileName}`; //~ automatically stored in public folder, no need to include 'public/'

  db.prepare(`
   INSERT INTO meals (
      title, summary, instructions, creator, creator_email, image, slug
   ) VALUES (
      @title, @summary, @instructions, @creator, @creator_email, @image, @slug
   )
   `).run(meal); //~ or use (?,?...) for values
}