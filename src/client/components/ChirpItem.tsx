import * as React from 'react';

import dayjs from 'dayjs';
import rt from 'dayjs/plugin/relativeTime';
import { SingleChirp } from '../../utilities/types';
import { Link } from 'react-router-dom';

dayjs.extend(rt);

const ChirpItem = (props: ChirpItemProps) => {
  const { user, text, id } = props.chirp;
  const date = Date.now() - Math.floor(Math.random() * 700000);
  return (
    <>
      <h6 className='fw-bold'>@{user}</h6>
      <p>{text}</p>
      <span className='text-secondary'>{dayjs(date).fromNow()}</span>
      <Link to={`/chirps/${id}`}>Just Me!</Link>
      <hr />
    </>
  );
};

export default ChirpItem;

interface ChirpItemProps {
  chirp: SingleChirp;
}
