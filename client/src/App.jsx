import CryptoForm from './components/CryptoForm';
import CryptoHistory from './components/CryptoHistory';
import { CryptoProvider } from './contexts/CryptoContext';

function App() {
  return (
    <CryptoProvider>
      <main>
        <div className='mainContainer'>
          <h1>File upload</h1>
          <CryptoForm />
          <CryptoHistory />
        </div>
      </main>
    </CryptoProvider>
  );
}

export default App;
