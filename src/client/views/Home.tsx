import * as React from 'react';
import { useState, useEffect } from 'react';
import { SingleChirp } from '../../utilities/types';
import ChirpInput from '../components/ChirpInput';
import ChirpList from '../components/ChirpList';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [reactChirps, setReactChirps] = useState<SingleChirp[]>([
    { username: '', content: '' },
  ]);

  const history = useHistory();

  useEffect(() => {
    async function getChirps() {
      try {
        const res = await fetch('/api/chirps');
        const chirpsList = await res.json();

        setReactChirps(chirpsList);
      } catch (error) {
        console.log(error);
      }
    }
    getChirps();
  }, []);

  const createChirp = async (
    chirp: SingleChirp,
    viewSingle: boolean
  ): Promise<void> => {
    try {
      const response = await fetch('/api/chirps', {
        body: JSON.stringify(chirp),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const json = await response.json();

      const insertID = json.response.insertId;
      chirp.id = insertID;

      if (viewSingle) {
        history.push(`/chirps/${insertID}`);
      } else {
        setReactChirps([chirp, ...reactChirps]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='container my-5'>
      <div className='card col-6 mx-auto bg-primary shadow-sm p-2 mb-4'>
        <h4 className='text-center text-white mb-0'>🍕🍕 Hello Chirper !!</h4>
      </div>
      <div className='container d-flex align-items-start justify-content-center'>
        <div className='row col-4 mx-auto'>
          <ChirpInput setChirps={createChirp} />
        </div>
        <div className='row col-5 mx-auto'>
          <ChirpList chirps={reactChirps} />
        </div>
      </div>
    </main>
  );
};

export default Home;
