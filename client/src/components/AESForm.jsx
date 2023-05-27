import React, { useContext, useState } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';

const AESForm = ({ setLoading }) => {
  const [keySize, setKeySize] = useState('select');
  const [type, setType] = useState('');

  const { addCrypto } = useContext(CryptoContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('keySize', keySize);
    formData.append('type', type);
    formData.append('file', e.target.file.files[0]);

    console.log(formData);

    // send data to server
    try {
      console.log(formData);
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/AES', {
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
      <label htmlFor='key_size'>Key Size</label>
      <br />
      <select
        name='key_size'
        id='key_size'
        defaultValue='select'
        onChange={(e) => setKeySize(e.target.value)}
      >
        <option value='select' disabled>
          Select
        </option>
        <option value='128'>128</option>
        <option value='192'>192</option>
        <option value='256'>256</option>
      </select>
      <br />
      {keySize !== 'select' && (
        <>
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
            <option value='CFB'>CFB</option>
            <option value='CTR'>CTR</option>
            <option value='ECB'>ECB</option>
            <option value='OFB'>OFB</option>
          </select>
        </>
      )}
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
