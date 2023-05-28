import React, { useContext, useState } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';
import CustomSelect from './CustomSelect';
import FilePicker from './FilePicker';

const AESForm = ({ setLoading }) => {
  const [type, setType] = useState('');
  const [file, setFile] = useState(null);

  const { addCrypto } = useContext(CryptoContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('type', type);
    formData.append('file', file);

    // send data to server
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/Blowfish', {
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
      <CustomSelect label='Type' labels={['CBC', 'ECB']} setOption={setType} />
      {type !== '' && (
        <>
          <FilePicker label='Pick File' setFile={setFile} />
          {file && (
            <button type='submit' className='submitButton'>
              Encrypt
            </button>
          )}
        </>
      )}
    </form>
  );
};

export default AESForm;
