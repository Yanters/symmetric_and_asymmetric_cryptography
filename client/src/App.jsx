import CryptoForm from './components/CryptoForm';
import CryptoHistory from './components/CryptoHistory';
import Statistic from './components/Statistic';
import { CryptoProvider } from './contexts/CryptoContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CryptoProvider>
      <main>
        <div className='mainContainer'>
          <CryptoForm />
          <Statistic />
          <CryptoHistory />
        </div>
      </main>
      <ToastContainer />
    </CryptoProvider>
  );
}

export default App;
