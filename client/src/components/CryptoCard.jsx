import React from 'react';
import { motion } from 'framer-motion';

import '../styles/CryptoCard.css';

const CryptoCard = ({ crypto }) => {
  if (!crypto) {
    return null;
  }

  const formatSizeUnits = (bytes) => {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + ' KB';
    } else {
      bytes = bytes + ' bytes';
    }
    return bytes;
  };

  const formatTimeUnits = (time) => {
    // time is in milliseconds
    if (time >= 3600000) {
      time = (time / 3600000).toFixed(2) + ' h';
    } else if (time >= 60000) {
      time = (time / 60000).toFixed(2) + ' min';
    } else if (time >= 1000) {
      time = (time / 1000).toFixed(2) + ' s';
    } else {
      time = time + ' ms';
    }
    return time;
  };

  return (
    <motion.div
      className='item'
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className='itemTitlesContainer'>
        <div className='itemTitle'>{crypto.alg}</div>
        {crypto.type ? <div className='itemSubtitle'>{crypto.type}</div> : null}
      </div>
      <div className='itemSize'>
        {formatSizeUnits(parseInt(crypto.fileSize))}
      </div>
      {crypto.keySize ? (
        <div className='timeContainer'>
          <div className='timeElement'>
            <div className='timeItemCaption'>Key Size</div>
            <div className='timeItemValue'>{crypto.keySize} bits</div>
          </div>
        </div>
      ) : null}
      <div className='timeElement'>
        <div className='timeItemCaption'>Total Time</div>
        <div className='timeItemValue'>
          {formatTimeUnits(parseFloat(crypto.totalTime))}
        </div>
      </div>
      {crypto.keyTime ? (
        <div className='timeContainer'>
          <div className='timeElement'>
            <div className='timeItemCaption'>Key Generation Time</div>
            <div className='timeItemValue'>
              {formatTimeUnits(parseFloat(crypto.keyTime))}
            </div>
          </div>
        </div>
      ) : null}
      <div className='timeContainer'>
        <div className='timeElement'>
          <div className='timeItemCaption'>Encryption</div>
          <div className='timeItemValue'>
            {formatTimeUnits(parseFloat(crypto.encTime))}
          </div>
        </div>
        <div className='timeElement'>
          <div className='timeItemCaption'>Decryption</div>
          <div className='timeItemValue'>
            {formatTimeUnits(parseFloat(crypto.decTime))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CryptoCard;
