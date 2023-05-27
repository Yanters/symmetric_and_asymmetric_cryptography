import React, { useContext } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';

import './CryptoHistory.css';

const CryptoHistory = () => {
  const { crypto } = useContext(CryptoContext);

  const formatSizeUnits = (bytes) => {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes > 1) {
      bytes = bytes + ' bytes';
    } else if (bytes == 1) {
      bytes = bytes + ' byte';
    } else {
      bytes = '0 bytes';
    }
    return bytes;
  };

  return (
    <div className='cryptoHistoryWrapper'>
      <h1>Crypto History</h1>
      {crypto.length > 0 ? (
        <div className='itemsContainer'>
          {crypto.map((crypto, index) => (
            <div key={index} className='item'>
              <div className='itemTitlesContainer'>
                <div className='itemTitle'>{crypto.alg}</div>
                {crypto.type ? (
                  <div className='itemSubtitle'>{crypto.type}</div>
                ) : null}
              </div>
              <div>File Size: {formatSizeUnits(parseInt(crypto.fileSize))}</div>
              {crypto.keySize ? <div>Key: {crypto.keySize} bits</div> : null}
              {crypto.keyTime ? (
                <div>
                  Key Generation Time: {parseFloat(crypto.keyTime).toFixed(4)}{' '}
                  ms
                </div>
              ) : null}
              <div>
                Encryption time: {parseFloat(crypto.encTime).toFixed(4)} ms
              </div>
              <div>
                Decryption time: {parseFloat(crypto.decTime).toFixed(4)} ms
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No crypto history</p>
      )}
    </div>
  );
};

export default CryptoHistory;
