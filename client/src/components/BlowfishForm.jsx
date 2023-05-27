import React, { useContext, useState } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';

const AESForm = ({ setLoading }) => {
  const [type, setType] = useState('');

  const { addCrypto } = useContext(CryptoContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('type', type);
    formData.append('file', e.target.file.files[0]);

    console.log(formData);

    // send data to server
    try {
      console.log(formData);
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/Blowfish', {
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
      <label htmlFor='type'>Type</label>
      <br />
      <select
        name='type'
        id='type'
        defaultValue='select'
        onChange={(e) => setType(e.target.value)}
      >
        <option value='select' disabled>
          Select
        </option>
        <option value='CBC'>CBC</option>
        <option value='ECB'>ECB</option>
      </select>
      <br />
      {type !== '' && (
        <>
          <label htmlFor='file'>Pick File</label>
          <br />
          <input type='file' name='file' id='file' />
          <br />

          <button type='submit'>Encrypt</button>
        </>
      )}
    </form>
  );
};

export default AESForm;
