import * as React from 'react';
import { SingleChirp } from '../../utilities/types';
import ChirpItem from './ChirpItem';

const ChirpList = (props: ChirpList) => {
  const { chirps } = props;
  return (
    <section className='card bg-white p-4 shadow-sm'>
      {chirps.map((chirp, index) => {
        return <ChirpItem key={`chirp-id${chirp.id}${index}`} chirp={chirp} />;
      })}
    </section>
  );
};

export default ChirpList;

interface ChirpList {
  chirps: SingleChirp[];
}
