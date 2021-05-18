import * as express from 'express';

const router = express.Router();
import db from './../db';

//* READ *//
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

//* CREATE *//
router.post('/', async (req, res) => {
  const { username, content } = req.body;
  const response = await db.Chirps.insert(username, content);

  res.status(200).json({
    message: 'Chirp was created succesfully🎉!',
    response,
  });
});

//* UPDATE *//
router.put('/:id', async (req, res) => {
  const id = +req.params.id;
  const updateData = req.body;
  console.log('Received to update: ', id, req.body);

  if (id) {
    const response = await db.Chirps.update(updateData, id);
    console.log('update response', response);

    res.status(200).json({
      message: 'Chirp was updated 🍕!',
    });
  } else {
    res.status(400).send('Please make sure you provide a chirp id');
  }
});

//* DELETE *//
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (id) {
    const response = await db.Chirps.destroy(id);
    res.status(200).json({
      message: 'Chirp deleted succesfully 🙋🏻‍♀️',
      response,
    });
  } else {
    res.status(400).json({
      message: 'Please provide a valid chirp id',
    });
  }
});

export default router;
