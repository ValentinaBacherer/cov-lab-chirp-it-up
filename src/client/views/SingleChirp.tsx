import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SingleChirp } from '../../utilities/types';

export const Chirp = () => {
  const { pizza_id } = useParams<{ pizza_id: string }>();
  const [chirp, setChirp] = useState<SingleChirp>(null);

  useEffect(() => {
    async function getSingleChirp() {
      try {
        const res = await fetch(`/api/chirps/${pizza_id}`);
        const chirpData = await res.json();
        if (chirpData) {
          setChirp(chirpData);
        } else {
          throw new Error('Not chirp found');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSingleChirp();
  }, [pizza_id]);
  if (!chirp) return <h1>Loading....</h1>;
  return (
    <div>
      <h1>Single Chirp</h1>
      <p>{chirp?.user}</p>
      <h5>{chirp?.text}</h5>
      <Link to='/'>Go home!</Link>
    </div>
  );
};
