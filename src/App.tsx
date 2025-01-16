import './App.css';
import { GlobalProvider } from './context/useGlobalContext';
import Index from './pages';

function App() {
  return (
    <GlobalProvider>
      <Index />
    </GlobalProvider>
  );
}

export default App;
