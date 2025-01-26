import './App.css';
import { GlobalProvider } from './context/useGlobalContext';
import PrincipalPage from './pages/PrincipalPage';

function App() {
  return (
    <GlobalProvider>
      <PrincipalPage />
    </GlobalProvider>
  );
}

export default App;
