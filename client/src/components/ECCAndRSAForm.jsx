import React, { useContext, useState } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';
import FilePicker from './FilePicker';

const ECCForm = ({ type, setLoading }) => {
  const { addCrypto } = useContext(CryptoContext);
  const [file, setFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);

    // send data to server
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/api/${type}`, {
        method: 'POST',
        body: formData,
      });
      const resData = await res.json();
      addCrypto(resData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FilePicker label='Pick File' setFile={setFile} />
      {file && (
        <button type='submit' className='submitButton'>
          Encrypt
        </button>
      )}
    </form>
  );
};

export default ECCForm;
