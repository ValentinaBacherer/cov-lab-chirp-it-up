import * as React from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import { SiGooglemessages } from 'react-icons/si';
import { SingleChirp } from '../../utilities/types';

interface ChirpInput {
  setChirps: (chirp: SingleChirp, option: boolean) => {};
}

const ChirpInput = ({ setChirps }: ChirpInput) => {
  const [username, setUsername] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [viewSingle, setViewSingle] = React.useState<boolean>(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (username && message) {
      const newChirp: SingleChirp = {
        username: username,
        content: message,
        date: Date().toString(),
      };
      setChirps(newChirp, viewSingle);
      setMessage('');
      setUsername('');
    }
  };

  const handleViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: boolean = e.target.checked;
    setViewSingle(value);
  };

  return (
    <>
      <section className='card bg-white p-4 shadow-sm mb-3'>
        <form className='mb-1'>
          <div className='input-group flex-nowrap mb-3'>
            <span className='input-group-text' id='addon-wrapping'>
              <FaUserAstronaut size={20} />
            </span>
            <input
              type='text'
              className='form-control'
              placeholder='Username'
              aria-label='Username'
              aria-describedby='addon-wrapping'
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>
          <div className='input-group flex-nowrap mb-3'>
            <span className='input-group-text' id='addon-wrapping'>
              <SiGooglemessages size={20} />
            </span>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              placeholder='What are you chewing?'
              rows={3}
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setMessage(e.target.value);
              }}
            ></textarea>
          </div>

          <button
            type='submit'
            className='btn btn-primary w-50'
            onClick={handleSubmit}
          >
            Chirp
          </button>
          <label className='ml-4 mx-0 text-muted' htmlFor='view-chirp'>
            View
          </label>
          <input
            className='ml-2  mx-0 px-0'
            type='checkbox'
            id='view-chirp'
            name='viewChirp'
            checked={viewSingle}
            onChange={handleViewChange}
          />
        </form>
        {viewSingle}
      </section>
    </>
  );
};

export default ChirpInput;
