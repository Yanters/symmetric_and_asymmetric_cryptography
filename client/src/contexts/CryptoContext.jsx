import { useState, createContext } from 'react';

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [crypto, setCrypto] = useState([]);

  const addCrypto = (crypto) => {
    setCrypto((prevCrypto) => [...prevCrypto, crypto]);
  };

  return (
    <CryptoContext.Provider value={{ crypto, addCrypto }}>
      {children}
    </CryptoContext.Provider>
  );
};
