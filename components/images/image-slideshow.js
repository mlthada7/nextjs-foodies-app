'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import burgerImg from '@/assets/burger.jpg';
import curryImg from '@/assets/curry.jpg';
import dumplingsImg from '@/assets/dumplings.jpg';
import macncheeseImg from '@/assets/macncheese.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import schnitzelImg from '@/assets/schnitzel.jpg';
import tomatoSaladImg from '@/assets/tomato-salad.jpg';
import classes from './image-slideshow.module.css';

const images = [
   { image: burgerImg, alt: 'A delicious, juicy burger' },
   { image: curryImg, alt: 'A delicious, spicy curry' },
   { image: dumplingsImg, alt: 'Steamed dumplings' },
   { image: macncheeseImg, alt: 'Mac and cheese' },
   { image: pizzaImg, alt: 'A delicious pizza' },
   { image: schnitzelImg, alt: 'A delicious schnitzel' },
   { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

/** //* This is a client-component
 * ~ This component is used to display an image slideshow that changes every 5 seconds, that happens only in browser (client-side)
 * ~ useEffect, useState, event-handlers like onClick dll also another example of a client-side component as it need user interaction
 * * So, we need to add the 'use client' directive to allows us use client-site features in our component
 */
export default function ImageSlideshow() {
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentImageIndex((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : 0
         );
      }, 5000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className={classes.slideshow}>
         {images.map((image, index) => (
            <Image
               key={index}
               src={image.image}
               className={index === currentImageIndex ? classes.active : ''}
               alt={image.alt}
            />
         ))}
      </div>
   );
}