import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'
import AuthProvider from './contexts/auth'
import SimulationProvider from './contexts/simulation'
import InvestimentosnProvider from './contexts/investimento'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProfessionalProvider from './contexts/professional'

function App() {
  return (
    <AuthProvider>
      <SimulationProvider>
        <InvestimentosnProvider>
          <ProfessionalProvider>
            <BrowserRouter>
              <ToastContainer autoClose={3000} />
              <Rotas />
            </BrowserRouter>
          </ProfessionalProvider>
        </InvestimentosnProvider>
      </SimulationProvider>
    </AuthProvider>
  );
}

export default App;
