import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SingleChirp } from '../../utilities/types';

interface ChirpParams {
  pizza_id: string;
}

export const Chirp: React.FC = () => {
  const { pizza_id } = useParams<ChirpParams>();
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
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-4'>
          <div className='card shadow-sm'>
            <div className='card-body'>
              <h2 className='card-title'>@{chirp?.username}</h2>
              <p className='card-subtitle text-muted'>Single Chirp</p>
              <h5 className='card-text'>{chirp?.content}</h5>
            </div>
            <div className='card-footer d-flex justify-content-between'>
              <Link to='/'>Go home!</Link>
              <Link className='text-info' to={`/chirps/edit/${pizza_id}`}>
                Edit Chirp!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
