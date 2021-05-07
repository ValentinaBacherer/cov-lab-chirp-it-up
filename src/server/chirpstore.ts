import * as fs from 'fs';
let chirps = { nextid: 0 };

if (fs.existsSync('chirps.json')) {
  chirps = JSON.parse(fs.readFileSync('chirps.json').toString());
}

export let getChirps = () => {
  return Object.assign({}, chirps); //create a copy and return it
};

export let getChirp = (id) => {
  return Object.assign({}, chirps[id]); //create a copy and return it
};

export let createChirp = (chirp) => {
  chirps[chirps.nextid++] = chirp; //assign and after increments value
  writeChirps();
};

export let updateChirp = (id, chirp) => {
  chirps[id] = chirp;
  writeChirps();
};

export let deleteChirp = (id) => {
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
