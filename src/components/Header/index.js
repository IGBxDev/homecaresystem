import { useContext } from 'react';
import './style.css';
import avatar from '../../assets/avatar.png'

import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import { FiHome, FiLogOut, FiSettings, FiTrendingUp, FiShoppingCart } from 'react-icons/fi'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';

function Header() {

    const { user, signOut } = useContext(AuthContext);
    return (
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} />
            </div>

            <Link to="/dashboard"><FiTrendingUp color="FFF" size={24} />Dashboard</Link>
           
            <Link to="/importador"><ImportExportIcon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }}/>Importador</Link>
            <Link to="/cadastro"><HowToRegSharpIcon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }}/>Cadastrar Profissional</Link>  
             <Link to="/cadastropaciente"><HowToRegSharpIcon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }}/>Cadastrar Paciente</Link>
            <Link to="/perfil"><FiSettings color="FFF" size={24} />Configurações</Link>
            <a className="logout-btn-menu" onClick={() => { signOut() }}>
            <FiLogOut color="FFF" size={24} />Sair
            </a>

        </div>

    )
}

export default Header;