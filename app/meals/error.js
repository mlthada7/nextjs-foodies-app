'use client';

//* this must be a client component because nextjs ensures that you can CATCH any errors with this component INCLUDING errors that HAPPEN on the client-side

//~ can received a props that passed by nextjs
export default function Error() {
  return (
    <main className="error">
      <h1>An error occured!</h1>
      <p>Failed to fetch meals data. Try again later - HC</p>
    </main>
  );
}