import { useContext, useState } from 'react';
import './style.css';
import avatar from '../../assets/avatar.png'

import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import { FiUserPlus, FiBriefcase, FiPlusCircle, FiPackage } from 'react-icons/fi'
import IMGHome from '../../assets/menuLateral/Home.png'
import IMGFolder from '../../assets/menuLateral/Folder.png'
import IMGConfig from '../../assets/menuLateral/Config.png'
import IMGSignOut from '../../assets/menuLateral/SignOut.png'
import IMGLogo from '../../assets/menuLateral/serven-close.png'
import IMGHamburguer from '../../assets/menuLateral/Hamburguer.png'
import IMGSevenLogo from '../../assets/menuLateral/serven.png'


import { 
    FcFolder, 
    FcHome, 
    FcOpenedFolder,
    FcCalculator, 
    FcBullish, 
    FcSettings, 
    FcBusinessman,
    FcServices,
    FcBarChart,
    FcDoughnutChart,
    FcList,
    FcRedo,
    FcPortraitMode,
    FcPlus,
    FcEngineering,
    FcPackage
} from "react-icons/fc";

import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AssessmentIcon from '@mui/icons-material/Assessment';


import 'primeicons/primeicons.css'

function Header() {

    const { user, signOut, isHumburguerActive, setIsHumburguerActive } = useContext(AuthContext);
    const [isConfig, setIsConfig] = useState(false);
    const [isModel, setIsModel] = useState(false);

    return (<>
        <div className={`sidebar ${isHumburguerActive ? 'sidebar-active' : ''}`}>
            <div className={`sidebar-logo`}>
                {!isHumburguerActive ? <img className='pact-logo' src={IMGLogo} /> : <img className='pact-logo' src={IMGSevenLogo} />}
            </div>

            <div className={`sidebar-icons${isHumburguerActive ? '-active' : ''}`}>
                <FcList size={30} 
                    onClick={() => 
                        { 
                            setIsHumburguerActive(!isHumburguerActive);  
                            setIsConfig(false);
                            setIsModel(false);
                        } 
                    } 
                />
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }} onClick={() => setIsHumburguerActive(!isHumburguerActive)}>Menu</span>
            </div>

            <div className={`sidebar-icons${isHumburguerActive ? '-active' : ''}`}>
                <Link to="/dashboard" onClick={() => setIsHumburguerActive(true)}> <FcBarChart size={30}/> </Link>
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}><Link to="/dashboard">Dashboard</Link></span>
            </div>

            <div className={`sidebar-icons${isHumburguerActive ? '-active' : ''}`}>
                <Link to="/dashboard" onClick={() => setIsHumburguerActive(true)}> <FcCalculator size={30}/> </Link>
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}><Link to="/dashboard">Financeiro</Link></span>
            </div>

            <div className={`sidebar-icons${isHumburguerActive ? '-active' : ''}`}>
                <Link to="/dashboard" onClick={() => setIsHumburguerActive(true)}> <FcDoughnutChart size={30}/> </Link>
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}><Link to="/dashboard">Relatórios</Link></span>
            </div>


            <div className={`sidebar-icons${isHumburguerActive ? '-active' : ''}`}>
                <button className={`btn-lateral${isHumburguerActive ? '-active' : ''}`} onClick={() => { setIsModel(!isModel) }}>
                    <FcOpenedFolder size={30} onClick={() => setIsHumburguerActive(true)} />
                </button>
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }} onClick={() => { setIsModel(!isModel) }} >Sistema importação</span>
            </div>

            {isModel &&
                <ul className={`Sub-menu${isHumburguerActive ? '-active' : ''}`}>
                    <li><Link to="/importarProfissional" className="Sub-menu-item"><FcFolder size={30} /><span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Modelo</span></Link></li>
                </ul>
            }

            <div className={`sidebar-icons${isHumburguerActive ? '-active' : ''}`}>
                <button className={`btn-lateral${isHumburguerActive ? '-active' : ''}`} onClick={() => { setIsConfig(!isConfig) }}>
                    <FcEngineering size={30} onClick={() => setIsHumburguerActive(true)} />
                </button>
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }} onClick={() => { setIsConfig(!isConfig) }} >Configurações</span>
            </div>

            {isConfig &&
                <ul className={`Sub-menu${isHumburguerActive ? '-active' : ''}`}>
                    <li><Link to="/cadastroProfissional" className="Sub-menu-item"><FcBusinessman  size={30} /><span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Cadastrar profissional</span></Link></li>
                    <li><Link to="/cadastroPaciente" className="Sub-menu-item"><FcBusinessman size={30} /><span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Cadastrar paciente</span></Link></li>
                    <li><Link to="/cadastroConvenio" className="Sub-menu-item"><FcPackage size={30} /><span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Cadastrar convênio</span></Link></li>
                    <li><Link to="/cadastroFrequencia" className="Sub-menu-item"><FcPackage size={30} /><span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Cadastrar frequência</span></Link></li>
                </ul>
            }

            <div className={`sidebar-icons${isHumburguerActive ? '-active' : ''} signOut `} onClick={() => { signOut() }}>
                <FcRedo size={30}  />
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Sair</span>
            </div>

        </div>
        <div className='header'>
            <a href="/meuperfil"><span>{user.nome ? user.nome : ''}</span></a>
            <div>
                <img src={user.avatarUrl ? user.avatarUrl : avatar} alt="" />
            </div>

        </div>
    </>
    )
}

export default Header;