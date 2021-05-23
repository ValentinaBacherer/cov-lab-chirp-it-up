import * as mysql from 'mysql';
import config from '../config';
import Chirps from './chirps';

export const Connection = mysql.createConnection(config.mySql);

export const Query = (query: string, values?: any) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(query, values, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

export default {
  Chirps,
};
