import { Query } from './index';

const all = async () => Query('SELECT * FROM chirps');

const one = async (id: number) =>
  Query('SELECT * FROM chirps where id=?', [id]);

const destroy = async (id: number) =>
  Query('DELETE FROM chirps WHERE id=?', [id]);

const insert = (username: string, content: string) =>
  Query('INSERT INTO chirps (username, content) VALUES (?, ?)', [
    username,
    content,
  ]);
const update = (
  updatedChirp: { username?: string; content?: string },
  id: number
) => Query('UPDATE chirps SET ? WHERE id = ?', [updatedChirp, id]);

export default {
  all,
  one,
  destroy,
  insert,
  update,
};
