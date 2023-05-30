import React, { useContext, useState } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';
import CustomSelect from './CustomSelect';
import FilePicker from './FilePicker';
import SubmitButton from './SubmitButton';
import { toast } from 'react-toastify';

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
      const res = await toast.promise(
        fetch('http://localhost:3001/api/AES', {
          method: 'POST',
          body: formData,
        }),
        {
          pending: 'Encrypting file...',
          success: 'File encrypted successfully',
          error: 'Error encrypting file',
        },
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
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
          {file && <SubmitButton text='Encrypt' />}
        </>
      )}
    </form>
  );
};

export default AESForm;
