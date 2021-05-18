import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import { Chirp } from './views/Chirp';
import { EditChirp } from './views/Edit';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/chirps/:pizza_id'>
          <Chirp />
        </Route>
        <Route exact path='/chirps/edit/:pizza_id'>
          <EditChirp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
