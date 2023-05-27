import React from 'react';
import AESForm from './AESForm';
import BlowfishForm from './BlowfishForm';
import ECCAndRSAForm from './ECCAndRSAForm';
import Loader from './Loader';

const CryptoForm = () => {
  const [crypto, setCrypto] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <div>
      <label htmlFor='file'>Pick Algorithm</label>
      <br />
      <select
        name='crypto'
        id='crypto'
        defaultValue=''
        onChange={(e) => setCrypto(e.target.value)}
      >
        <option value=''>Select</option>
        <option value='AES'>AES</option>
        <option value='Blowfish'>Blowfish</option>
        <option value='RSA'>RSA</option>
        <option value='ECC'>ECC</option>
      </select>
      <br />
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
