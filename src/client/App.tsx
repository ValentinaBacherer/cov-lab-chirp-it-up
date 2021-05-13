import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SingleChirp } from '../utilities/types';
import Home from './views/Home';
import { Chirp } from './views/Chirp';

const App = () => {
  const [reactChirps, setReactChirps] = useState<SingleChirp[]>([
    { user: null, text: null },
  ]);

  useEffect(() => {
    async function getChirps() {
      try {
        const res = await fetch('/api/chirps');
        const chirpsList = await res.json();

        setReactChirps(chirpsList);
      } catch (error) {}
    }
    getChirps();
  }, []);

  const updateChirps = async (chirp: SingleChirp): Promise<void> => {
    try {
      const response = await fetch('/api/chirps', {
        body: JSON.stringify(chirp),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }

    setReactChirps([chirp, ...reactChirps]);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/chirps/:pizza_id'>
          <Chirp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
