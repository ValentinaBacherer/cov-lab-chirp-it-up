import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaUserAstronaut } from 'react-icons/fa';
import { SiGooglemessages } from 'react-icons/si';
import { SingleChirp } from '../../utilities/types';

interface ChirpInput {
  setChirps: () => {};
}

const ChirpInput = ({ setChirps }) => {
  const [username, setUsername] = React.useState<string>(null);
  const [message, setMessage] = React.useState<string>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username && message) {
      const newChirp: SingleChirp = {
        user: username,
        text: message,
        date: Date().toString(),
        id: uuidv4(),
      };
      setChirps(newChirp);
      setMessage('');
      setUsername('');
    }
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
            className='btn btn-primary w-100'
            onClick={handleSubmit}
          >
            Chirp
          </button>
        </form>
      </section>
    </>
  );
};

export default ChirpInput;
