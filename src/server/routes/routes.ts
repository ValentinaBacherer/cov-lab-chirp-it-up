import * as express from 'express';
import chirpsRouter from './chirps';

const router = express.Router();

router.use('/chirps', chirpsRouter);

router.get('/checkHealth', (req, res) => {
  res.json('Congratulations, you have won a life on earth!');
});

router.get('*', (req, res) => {
  const badUrl = req.url;
  res.status(404).send(`Sorry, we don't have anything at /api${badUrl} 😕`);
});

export default router;
