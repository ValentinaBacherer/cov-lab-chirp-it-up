import * as express from 'express';
import apiRouter from './routes/routes';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRouter);

app.get('*', (req, res) => {
  const badUrl = req.url;
  res.status(404).send(`Sorry, we don't have anything at /${badUrl} 😕`);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`🍕🍕🍕\nServer listening on port: ${port}`)
);
