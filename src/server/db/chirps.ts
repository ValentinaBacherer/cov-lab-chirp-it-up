import { SingleChirp } from '../../utilities/types';
import { Query } from './index';

const all = async () => Query<Array<SingleChirp>>('SELECT * FROM chirps');

const one = async (id: string) =>
  Query<SingleChirp[]>('SELECT * FROM chirps where id=?', [id]);

const destroy = async (id: string) =>
  Query('DELETE FROM chirps WHERE id=?', [id]);

const insert = (newChirp: { id: string; username: string; content: string }) =>
  Query('INSERT INTO chirps SET ?', [newChirp]);

const update = (
  updatedChirp: { username?: string; content?: string },
  id: string
) => Query('UPDATE chirps SET ? WHERE id = ?', [updatedChirp, id]);

export default {
  all,
  one,
  destroy,
  insert,
  update,
};
