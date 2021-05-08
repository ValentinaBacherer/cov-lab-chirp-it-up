import * as React from 'react';

import dayjs from 'dayjs';
import rt from 'dayjs/plugin/relativeTime';
import { SingleChirp } from '../../utilities/types';

dayjs.extend(rt);

const ChirpItem = (props: ChirpItemProps) => {
  const { user, text } = props.chirp;
  const date = Date.now() - 300000;
  return (
    <>
      <h6 className='fw-bold'>@{user}</h6>
      <p>{text}</p>
      <span className='text-secondary'>{dayjs(date).fromNow()}</span>
      <hr />
    </>
  );
};

export default ChirpItem;

interface ChirpItemProps {
  chirp: SingleChirp;
}
