import { useState } from 'react';
import CryptoForm from './components/CryptoForm';
import CryptoHistory from './components/CryptoHistory';
import Statistic from './components/Statistic';
import { CryptoProvider } from './contexts/CryptoContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [algSelected, setAlgSelected] = useState('All');

  return (
    <CryptoProvider>
      <main>
        <div className='mainContainer'>
          <CryptoForm />
          <Statistic algSelected={algSelected} setAlgSelected={setAlgSelected} />
          <CryptoHistory algSelected={algSelected} />
        </div>
      </main>
      <ToastContainer />
    </CryptoProvider>
  );
}

export default App;
