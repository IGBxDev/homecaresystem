//Libary
import { useContext } from 'react'
import { FiTrendingUp } from 'react-icons/fi'

//Imports
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'

//CSS
import './style.css';

function Financeiro() {
  const { user, isHumburguerActive } = useContext(AuthContext);

  
  return (
    <div className="App">
      <Header />
      <div className={`content${isHumburguerActive? '-active' : '' }`}>
        <Title nome="Financeiro - Em construção">
          <FiTrendingUp size={25} />
        </Title>
        <div className="container-dash">
        <div className="row">

        </div>
        </div>
      </div>
    </div>
  );

}
export default Financeiro;
