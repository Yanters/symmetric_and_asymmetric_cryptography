import React, { useContext } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';

const ECCForm = ({ type, setLoading }) => {
  const { addCrypto } = useContext(CryptoContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);

    console.log(formData);

    // send data to server
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/api/${type}`, {
        method: 'POST',
        body: formData,
      });
      setLoading(false);
      const resData = await res.json();
      console.log(resData);
      addCrypto(resData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmit} encType='multipart/form-data' method='POST'>
      <br />
      <label htmlFor='file'>Pick File</label>
      <br />
      <input type='file' name='file' id='file' />
      <br />

      <button type='submit'>Encrypt</button>
    </form>
  );
};

export default ECCForm;
