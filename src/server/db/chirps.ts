import { Query } from './index';

const all = async () => Query('SELECT * FROM chirps');
const one = async (id: number) =>
  Query('SELECT * FROM chirps where id=?', [id]);
const destroy = async (id: number) =>
  Query('DELETE FROM todos WHERE id=?', [id]);
const insert = (username: string, content: string, location?: string) =>
  Query('INSERT INTO chirps (username, content, location) VALUES (?, ?,?)', [
    username,
    content,
    location,
  ]);
const update = (
  id: number,
  username?: string,
  content?: string,
  location?: string
) =>
  Query(
    'UPDATE chirps (userid, content, location) VALUES (?,?,?) WHERE id = ?',
    [username, content, location, id]
  );

// OPTIONAL -> Short hand way
// const insert = (newChirp: {
//   userid: number;
//   content: string;
//   location: string;
// }) => Query('INSERT INTO chirps SET ?', newChirp);

export default {
  all,
  one,
  destroy,
  insert,
  update,
};
