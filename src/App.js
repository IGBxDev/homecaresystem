import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'
import AuthProvider from './contexts/auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CrudProvider from './contexts/Crud'

function App() {
  return (
    <AuthProvider>
      <CrudProvider>
        <BrowserRouter>
          <ToastContainer autoClose={3000} />
          <Rotas />
        </BrowserRouter>
      </CrudProvider>
    </AuthProvider>
  );
}

export default App;
