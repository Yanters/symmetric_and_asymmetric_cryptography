import React, { useContext } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';

import './CryptoHistory.css';
import CryptoCard from './CryptoCard';

const CryptoHistory = () => {
  const { crypto } = useContext(CryptoContext);


  return (
    <div className='cryptoHistoryWrapper'>
      <h1>Crypto History</h1>
      {crypto.length > 0 ? (
        <div className='itemsContainer'>
          {crypto.map((crypto, index) => (
            <CryptoCard key={index} crypto={crypto} />
          ))}
        </div>
      ) : (
        <p>No crypto history</p>
      )}
    </div>
  );
};

export default CryptoHistory;
