import * as express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { MySQLResponse } from '../../utilities/types';
const router = express.Router();
import db from './../db';

//* READ *//
router.get('/:id?', async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const chirp = (await db.Chirps.one(id))[0];
      if (chirp) {
        res.json(chirp);
      } else {
        throw new Error('No chirp found');
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(`Sorry, chirp ID #${id} not found 😕`);
    }
  } else {
    try {
      const allChirps = await db.Chirps.all();
      allChirps.forEach((chirp) => {
        delete chirp.userid;
      });
      res.json(allChirps);
    } catch (e) {
      console.log(e);
      res.status(500).send('Sorry, we have a server Problem 😕');
    }
  }
});

//* CREATE *//
router.post('/', async (req, res) => {
  const id = uuidv4();
  const { username, content } = req.body;
  const response: MySQLResponse = await db.Chirps.insert({
    id,
    username,
    content,
  });

  console.log({ response });
  if (response.sqlMessage) {
    res.status(500).json({
      message: 'Chirp was NOT created succesfully :(!',
      error: response.sqlMessage,
    });
  } else {
    res.status(200).json({
      message: 'Chirp was created succesfully🎉!',
      response,
      id,
    });
  }
});

//* UPDATE *//
router.put('/:id', async (req, res) => {
  const id = req.params.id;
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
  const id = req.params.id;
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
