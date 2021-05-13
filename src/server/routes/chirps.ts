import * as express from 'express';

const router = express.Router();
import * as chirpStore from '../../utilities/chirpstore';
import { SingleChirp } from '../../utilities/types';

router.get('/:id?', (req, res) => {
  const id = req.params.id;
  if (id) {
    const singleChirp: SingleChirp = chirpStore.getChirp(id);
    if (singleChirp.text) {
      res.json(singleChirp);
    } else {
      res.status(404).send(`Sorry, chirp ID #${id} not found 😕`);
    }
  } else {
    const allChirps = chirpStore.getChirps();

    const cleanedUpChirps: SingleChirp[] = Object.keys(allChirps).map((key) => {
      return {
        // @ts-ignore
        ...allChirps[key],
        id: key,
      };
    });
    cleanedUpChirps.pop(); //clean nextid
    res.send(cleanedUpChirps);
  }
});

router.post('/', (req, res) => {
  const newChirp = req.body;
  chirpStore.createChirp(newChirp);
  const insertedChirpID = chirpStore.getLastInsertedID();
  res.status(200).json({
    message: 'Chirp was created succesfully🎉!',
    insertID: insertedChirpID,
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedChirp = req.body;
  console.log('Received: ', id, updatedChirp);

  if (id) {
    chirpStore.updateChirp(id, updatedChirp);
    res.status(200).json({
      message: 'Chirp was updated 🍕!',
    });
  } else {
    res.status(400).send('Please make sure you provide a chirp id');
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    chirpStore.deleteChirp(id);
    res.status(200).json({
      message: 'Chirp deleted succesfully 🙋🏻‍♀️',
    });
  } else {
    res.status(400).json({
      message: 'Please provide a valid chirp id',
    });
  }
});

export default router;
