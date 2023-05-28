import React from 'react';
import AESForm from './AESForm';
import BlowfishForm from './BlowfishForm';
import ECCAndRSAForm from './ECCAndRSAForm';
import Loader from './Loader';
import CustomSelect from './CustomSelect';

import './CryptoForm.css';

const CryptoForm = () => {
  const [crypto, setCrypto] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <div className='cryptoFormWrapper'>
      <div className='formTitle'>Timer</div>
      <div className='formSubtitle'>Algorithms</div>
      <div className='algorithmsContainer'>
        <CustomSelect
          id='algorithm'
          label='Symmetric'
          labels={['AES', 'Blowfish']}
          setOption={setCrypto}
        />
        <CustomSelect
          id='algorithm'
          label='Asymmetric'
          labels={['RSA', 'ECC']}
          setOption={setCrypto}
        />
      </div>
      {crypto === 'AES' && (
        <>
          <AESForm setLoading={setLoading} />
        </>
      )}
      {crypto === 'Blowfish' && (
        <>
          <BlowfishForm setLoading={setLoading} />
        </>
      )}
      {crypto === 'RSA' || crypto === 'ECC' ? (
        <>
          <ECCAndRSAForm type={crypto} setLoading={setLoading} />
        </>
      ) : null}
      {loading && <Loader />}
    </div>
  );
};

export default CryptoForm;
