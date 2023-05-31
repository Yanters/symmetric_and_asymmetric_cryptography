import React, { useContext } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';
import { motion } from 'framer-motion';

import '../styles/CryptoHistory.css';
import CryptoCard from './CryptoCard';

const CryptoHistory = ({ algSelected }) => {
  const { crypto } = useContext(CryptoContext);

  const data = crypto.filter((crypto) => {
    if (algSelected === 'All') {
      return crypto;
    } else {
      return crypto.alg === algSelected;
    }
  });

  return (
    <motion.div
      className='cryptoHistoryWrapper'
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1>Crypto History</h1>
      {data.length > 0 ? (
        <div className='itemsContainer'>
          {data.map((crypto, index) => (
            <CryptoCard key={index} crypto={crypto} />
          ))}
        </div>
      ) : (
        <p>No crypto history</p>
      )}
    </motion.div>
  );
};

export default CryptoHistory;
