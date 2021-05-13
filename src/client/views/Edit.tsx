import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SingleChirp } from '../../utilities/types';

interface EditChirpParams {
  pizza_id: string;
}

export const EditChirp: React.FC = () => {
  const { pizza_id } = useParams<EditChirpParams>();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChirp({
      ...chirp,
      text: e.target.value,
    });
  };

  const saveChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/chirps/${pizza_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(chirp),
      });

      const savedData = await response.json();
      if (savedData) {
        console.log('Response json', savedData);
      } else {
        throw new Error('No response');
      }
    } catch (error) {
      console.log('Error message from server: ', error);
    }
  };

  const deleteChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await fetch(`/api/chirps/${pizza_id}`, {
        method: 'DELETE',
      });
      const deletedData = await response.json();
      console.log('Delete Response', deletedData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!chirp) return <h1>Loading....</h1>;

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-5'>
          <div className='card shadow-sm'>
            <div className='card-body'>
              <h2 className='card-title'>{chirp?.user}</h2>
              <p className='card-subtitle'>Single Chirp</p>
              <h5 className='card-text'>{chirp?.text}</h5>
              <label htmlFor='chirp'></label>
              <input
                className='w-100'
                type='text'
                value={chirp?.text}
                id='chirp'
                onChange={handleChange}
              />
            </div>
            <div className='card-footer d-flex justify-content-between'>
              <Link className='btn btn-info' to='/'>
                Go home!
              </Link>
              <button className='btn btn-primary' onClick={saveChirp}>
                Save Edits!
              </button>
              <button className='btn btn-danger' onClick={deleteChirp}>
                Delete chirp!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
