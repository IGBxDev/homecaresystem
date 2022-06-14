import {useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';

//css
import './style.css';
import Register from '../../components/Register';
function CadastroPaciente() {

  const { user } = useContext(AuthContext);
  
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Title nome="Cadastro de paciente">
          <HowToRegSharpIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
        </Title>
        <div className="container-dash">
          <Register formulario={'paciente'} />
        </div>
      </div>
    </div>
  );
}

export default CadastroPaciente;
