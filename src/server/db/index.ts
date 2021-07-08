import * as mysql from 'mysql';
import { MySQLResponse } from '../../utilities/types';
import config from '../config';
import Chirps from './chirps';

// pool lets you have multiple concurrent connections at the same time, it helps balance the load
export const pool = mysql.createPool(config.mySql);

export const Query = <T = MySQLResponse>(query: string, values?: any) => {
  return new Promise<T>((resolve, reject) => {
    const formattedSQL = mysql.format(query, values);
    console.log(formattedSQL);

    pool.query(formattedSQL, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

export default {
  Chirps,
};
