import * as fs from 'fs';
import { ChirpsObject, SingleChirp } from './types';

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

  // -> I didn't know how to handle this nextid
  chirps[chirps.nextid++] = chirp; //assign and after increments value
  console.log('created - chirps object', chirps);

  writeChirps();
};

export let updateChirp = (id: string, chirp: SingleChirp): void => {
  chirps[id] = chirp;
  writeChirps();
};

export let deleteChirp = (id: string): void => {
  delete chirps[id];
  writeChirps();
};

export let writeChirps = (): void => {
  fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

// new function from Andrew
export let getLastInsertedID = (): string | number => {
  return chirps.nextid;
};
