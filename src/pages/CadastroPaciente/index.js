import {useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import UserForm from '../../components/UserForm/UserForm'

//css
import './style.css';
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
          <UserForm />
        </div>
      </div>
    </div>
  );
}

export default CadastroPaciente;
