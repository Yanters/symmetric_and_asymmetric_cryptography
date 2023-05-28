import React, { useContext, useState } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';
import CustomSelect from './CustomSelect';
import FilePicker from './FilePicker';

const AESForm = ({ setLoading }) => {
  const [keySize, setKeySize] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState(null);

  const { addCrypto } = useContext(CryptoContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('keySize', keySize);
    formData.append('type', type);
    formData.append('file', e.target.file.files[0]);

    // send data to server
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/AES', {
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
      <CustomSelect
        label='Type'
        labels={['CBC', 'CFB', 'CTR', 'ECB', 'OFB']}
        setOption={setType}
      />

      {type !== '' && (
        <CustomSelect
          label='Key Size'
          labels={['128', '192', '256']}
          setOption={setKeySize}
        />
      )}
      {keySize !== '' && (
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
