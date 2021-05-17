import * as express from 'express';

const router = express.Router();
import * as chirpStore from '../../utilities/chirpstore';
import db from './../db';

router.get('/:id?', async (req, res) => {
  const id = +req.params.id;
  if (id) {
    try {
      const chirp = (await db.Chirps.one(id))[0];
      res.json(chirp);
    } catch (e) {
      console.log(e);
      res.status(500).send(`Sorry, chirp ID #${id} not found 😕`);
    }
  } else {
    try {
      const allChirps = await db.Chirps.all();
      res.json(allChirps);
    } catch (e) {
      console.log(e);
      res.status(500).send('Sorry, we have a server Problem 😕');
    }
  }
});

router.post('/', async (req, res) => {
  const { username, content } = req.body;
  const response = await db.Chirps.insert(username, content);

  res.status(200).json({
    message: 'Chirp was created succesfully🎉!',
    response,
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
