import { useContext } from 'react'

import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiDollarSign, FiEdit, FiX } from 'react-icons/fi'

import './style.css';
import { toast } from 'react-toastify';
import ImportExportIcon from '@mui/icons-material/ImportExport';

const Importador = () => {

  const { user } = useContext(AuthContext);
  
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Title nome="Importador">
          <ImportExportIcon />
        </Title>
        <div className="container-dash">
          
        </div>
      </div>
    </div >
  );
}

export default Importador;
