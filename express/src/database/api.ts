import { pool } from './db';

export const execute = (sqlQuery: string) => {
  return new Promise((resolve, rejects) => {
    pool.query(sqlQuery, (err, data) => {
      if (err) {
        rejects(err);
      } else {
        resolve(data);
      }
    });
  })
}
