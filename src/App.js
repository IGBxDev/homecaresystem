import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'
import AuthProvider from './contexts/auth'
import SimulationProvider from './contexts/simulation'
import InvestimentosnProvider from './contexts/investimento'
import DebitosProvider from './contexts/debitos'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <SimulationProvider>
        <InvestimentosnProvider>
          <DebitosProvider>
            <BrowserRouter>
              <ToastContainer autoClose={3000} />
              <Rotas />
            </BrowserRouter>
          </DebitosProvider>
        </InvestimentosnProvider>
      </SimulationProvider>
    </AuthProvider>
  );
}

export default App;
