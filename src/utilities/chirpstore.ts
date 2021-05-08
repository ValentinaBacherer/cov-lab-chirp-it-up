import * as fs from 'fs';
import { ChirpsObject, SingleChirp } from '../utilities/types';

let chirps: ChirpsObject = { nextid: 0 };

if (fs.existsSync('chirps.json')) {
  // returns an object
  chirps = JSON.parse(fs.readFileSync('chirps.json').toString());
}

export let getChirps = (): ChirpsObject => {
  return Object.assign({}, chirps); //create a copy and return it
};

export let getChirp = (id: string): SingleChirp => {
  return Object.assign({}, chirps[id]); //create a copy and return it
};

export let createChirp = (chirp: SingleChirp): void => {
  console.log('chirp to create:', chirp);

  chirps[chirps.nextid++] = chirp; //assign and after increments value
  console.log('created - chirps object', chirps);

  writeChirps();
};

export let updateChirp = (id: string, chirp: SingleChirp) => {
  chirps[id] = chirp;
  writeChirps();
};

export let deleteChirp = (id: string) => {
  delete chirps[id];
  writeChirps();
};

export let writeChirps = () => {
  fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

// new function from Andrew
export let getLastInsertedID = () => {
  return chirps.nextid;
};
