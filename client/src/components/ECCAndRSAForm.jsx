import React, { useContext, useState } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';
import FilePicker from './FilePicker';
import SubmitButton from './SubmitButton';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';

const ECCForm = ({ type, setLoading }) => {
  const { addCrypto } = useContext(CryptoContext);
  const [file, setFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // append every file to formData
    for (let i = 0; i < file.length; i++) {
      formData.append('file', file[i]);
    }

    // send data to server
    try {
      setLoading(true);
      const res = await toast.promise(
        fetch(`http://localhost:3001/api/${type}`, {
          method: 'POST',
          body: formData,
        }),
        {
          pending: 'Doing crazy calculations...',
          success: 'Timing calculations was successful',
          error: 'Error occurred',
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
      // add every element of resData array to context
      resData.forEach((crypto) => {
        addCrypto(crypto);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FilePicker label='Pick File' setFile={setFile} />
      <AnimatePresence>
        {file && <SubmitButton text='Encrypt' />}
      </AnimatePresence>
    </form>
  );
};

export default ECCForm;
