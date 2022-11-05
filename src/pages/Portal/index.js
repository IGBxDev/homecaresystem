import Header from '../../components/Header'
import Title from '../../components/Title'


import { FiTrendingUp } from 'react-icons/fi'
import './style.css';


function Portal() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Title nome="Portal">
          <FiTrendingUp size={25} />
        </Title>
        <div className="container-dash">

        </div>
      </div >
    </div>
  );
}

export default Portal;
