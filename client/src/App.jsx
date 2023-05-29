import CryptoForm from './components/CryptoForm';
import CryptoHistory from './components/CryptoHistory';
import Statistic from './components/Statistic';
import { CryptoProvider } from './contexts/CryptoContext';

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
    </CryptoProvider>
  );
}

export default App;
