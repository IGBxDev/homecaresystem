import {useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';

//css
import './style.css';
import Register from '../../components/Register';
function CadastroConvenio() {

  const { user, isHumburguerActive } = useContext(AuthContext);
  
  return (
    <div className="App">
      <Header />
      <div className={`content${isHumburguerActive? '-active' : '' }`}>
        <Title nome="Cadastrar Convênio: TELA EM CONSTRUÇÃO">
          <HowToRegSharpIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
        </Title>
        <div className="container-dash">
          {/* <Register formulario={'paciente'} /> */}
        </div>
      </div>
    </div>
  );
}

export default CadastroConvenio;
