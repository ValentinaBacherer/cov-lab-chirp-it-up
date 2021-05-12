import * as fs from 'fs';
import { ChirpsObject, SingleChirp } from './types';

let chirps: ChirpsObject = { nextid: 0 };

if (fs.existsSync('chirps.json')) {
  // loads stored chirps and returns an object
  chirps = JSON.parse(fs.readFileSync('chirps.json').toString());
}

export let getChirps = (): ChirpsObject => {
  const newChirps: SingleChirp = {};
  return Object.assign(newChirps, chirps); //create a copy and return it
};

export let getChirp = (id: string): SingleChirp => {
  const newChirp: SingleChirp = {};
  return Object.assign(newChirp, chirps[id]); //create a copy and return it
};

export let createChirp = (chirp: SingleChirp): void => {
  chirps[chirps.nextid++] = chirp; //assign and after increments value
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
  return chirps.nextid - 1;
};
