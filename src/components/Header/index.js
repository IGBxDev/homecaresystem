import { useContext } from 'react';
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import IMGLogo from '../../assets/menuLateral/serven-close.png'
import LogoCompany from '../../assets/menuLateral/logo-company.png';
import IMGSevenLogo from '../../assets/menuLateral/serven.png'
import { 
    FcFolder, 
    FcOpenedFolder,
    FcCalculator, 
    FcBusinessman,
    FcBarChart,
    FcDoughnutChart,
    FcList,
    FcRedo,
    FcEngineering,
    FcPackage,
    FcInspection,
    FcCalendar,
    FcPlanner,
    FcPlus,
    FcSportsMode,
    FcImport,
    FcFile,
    FcExpand
} from "react-icons/fc";
import './style.css';
import 'primeicons/primeicons.css'

function Header() {

    const { user, signOut, isHumburguerActive, setIsHumburguerActive, isSelected, setIsSelected,  isConfig, setIsConfig, isModel, setIsModel } = useContext(AuthContext);

    const setConfigMenu = (itemMenu) => {
        setIsHumburguerActive(!isHumburguerActive)
        setIsConfig(false)
        setIsModel(false);
        setIsSelected(itemMenu)
    }

    const setClickMenu = (itemMenu) => {
        setIsSelected(itemMenu)
        setIsHumburguerActive(true)
    }

    return (<>
        <div className={`sidebar ${isHumburguerActive ? 'sidebar-active' : ''}`}>
            <div className={`sidebar-logo`}>
                {!isHumburguerActive ? <img className='pact-logo' src={LogoCompany} /> : <img className='pact-logo' src={LogoCompany} />}
            </div>

            {/* Menu principal */}
            <Link to={''} onClick={() => setConfigMenu(1)} className={`sidebar-icons${isHumburguerActive ? '-active' : ''} ${isSelected === 1 ? 'selected' : '' }`}>
                <FcList size={30} />
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }} >Menu</span>
            </Link>
                
            <Link to={'/dashboard'} onClick={() => setClickMenu(2)} className={`sidebar-icons${isHumburguerActive ? '-active' : ''} ${isSelected === 2 ? 'selected' : '' }`}>
                <FcBarChart size={30}/>
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Dashboard </span>
            </Link>

            <Link to={'/financeiro'} onClick={() =>  setClickMenu(3)} className={`sidebar-icons${isHumburguerActive ? '-active' : ''} ${isSelected === 3 ? 'selected' : '' }`}>
                <FcCalculator size={30}/>
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Financeiro <FcExpand size={20}/></span>
            </Link>

            <Link to={'/relatorios'} onClick={() =>  setClickMenu(4)} className={`sidebar-icons${isHumburguerActive ? '-active' : ''} ${isSelected === 4 ? 'selected' : '' }`}>
                <FcDoughnutChart size={30}/>
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Relatórios <FcExpand size={20}/> </span>
            </Link>

            <Link to={'/relatorios'} onClick={() =>  setClickMenu(12)} className={`sidebar-icons${isHumburguerActive ? '-active' : ''} ${isSelected === 12 ? 'selected' : '' }`}>
                <FcCalendar size={30}/>
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Calendário de visitas</span>
            </Link>

            <Link to={'/relatorios'} onClick={() =>  setClickMenu(13)} className={`sidebar-icons${isHumburguerActive ? '-active' : ''} ${isSelected === 13 ? 'selected' : '' }`}>
                <FcPlanner size={30}/>
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Visitas</span>
            </Link>


            <Link to={''} onClick={() => { setClickMenu(5); setIsModel(!isModel) }} className={`sidebar-icons${isHumburguerActive ? '-active' : ''} ${isSelected === 5 ? 'selected' : '' }`}>
                {isModel? <FcImport size={30}/> : <FcImport size={30} /> }
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Importação de dados <FcExpand size={20}/></span>
            </Link>

            {isModel &&
                <Link to="/importarProfissional" onClick={()=> setClickMenu(6)} className={`Sub-menu${isHumburguerActive ? '-active' : ''} ${isSelected === 6 ? 'selected' : '' }`}><FcFile size={30} /><span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Modelo</span></Link>
            }

            <Link to={''} onClick={() => {  setClickMenu(7); setIsConfig(!isConfig) }} className={`sidebar-icons${isHumburguerActive ? '-active' : ''} ${isSelected === 7 ? 'selected' : '' }`}>
               <FcInspection size={30} />
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>RH <FcExpand size={20}/></span>
            </Link>

            {isConfig &&
                <>
                <Link to="/cadastroProfissional" onClick={()=> setClickMenu(8)}  className={`Sub-menu${isHumburguerActive ? '-active' : ''} ${isSelected === 8 ? 'selected' : '' }`}><FcSportsMode size={30} /><span >Cadastrar profissional</span></Link>
                <Link to="/cadastroPaciente" onClick={()=> setClickMenu(9)} className={`Sub-menu${isHumburguerActive ? '-active' : ''} ${isSelected === 9 ? 'selected' : '' }`}><FcPlus size={30} /><span >Cadastrar paciente</span></Link>
                <Link to="/cadastroConvenio" onClick={()=> setClickMenu(10)} className={`Sub-menu${isHumburguerActive ? '-active' : ''} ${isSelected === 10 ? 'selected' : '' }`}><FcPackage size={30} /><span >Cadastrar convênio</span></Link>
                <Link to="/cadastroFrequencia" onClick={()=> setClickMenu(11)} className={`Sub-menu${isHumburguerActive ? '-active' : ''} ${isSelected === 11 ? 'selected' : '' }`}><FcPackage size={30} /><span >Cadastrar frequência</span></Link>
                </>
            }

            <Link to={''} className={`sidebar-icons${isHumburguerActive ? '-active' : ''} signOut `} onClick={() => { signOut() }}>
                <FcRedo size={30}  />
                <span style={{ display: `${isHumburguerActive ? '' : 'none'}` }}>Sair</span>
            </Link>

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