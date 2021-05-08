import * as express from 'express';

const router = express.Router();
import * as chirpStore from '../chirpstore';
import { SingleChirp, ChirpsObject } from '../chirpstore';

router.get('/:id?', (req, res) => {
  const id = req.params.id;
  if (id) {
    const singleChirp: SingleChirp = chirpStore.getChirp(id);
    if (singleChirp.text) {
      res.json(singleChirp);
    } else {
      res.status(404).send(`Sorry, chirp ID #${id} not found :( 😕`);
    }
  } else {
    const allChirps = chirpStore.getChirps();

    const cleanedUpChirps = Object.keys(allChirps).map((key) => {
      return {
        id: key,
        ...allChirps[key],
      };
    });
    cleanedUpChirps.pop();
    res.send(cleanedUpChirps);
  }
});

router.post('/', (req, res) => {
  const newChirp = req.body;
  console.log('chirp to create', newChirp);

  chirpStore.createChirp(newChirp);
  const insertedChirpID = chirpStore.getLastInsertedID();
  res.status(200).json({
    message: 'Chirp was created succesfully!',
    insertID: insertedChirpID,
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedChirp = req.body;
  if (id) {
    chirpStore.updateChirp(id, updatedChirp);
    res.sendStatus(200);
  } else {
    res.status(400).send('Please make sure you provide a chirp id');
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    chirpStore.deleteChirp(id);
    res.sendStatus(200);
  } else {
    res.status(400).send('Please provide a valid chirp id');
  }
});

export default router;