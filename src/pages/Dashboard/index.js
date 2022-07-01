import { useEffect, useState, useContext, useCallback } from 'react'
import { AuthContext } from '../../contexts/auth'


import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiTrendingUp } from 'react-icons/fi'

import './style.css';
import Card from '../../components/Card';

function Dashboard() {
  const { user, isHumburguerActive } = useContext(AuthContext);

  
  return (
    <div className="App">
      <Header />
      <div className={`content${isHumburguerActive? '-active' : '' }`}>
        <Title nome="Dashboards">
          <FiTrendingUp size={25} />
        </Title>
        <div className="container-dash">
        <div className="row">

<Card 
  classCol={''} 
  categoria={'Atendimento em aberto'} 
  essencial={'5'} 
  classBorderLeft={'primary'} 
  calssRow={''}
  classComment={'fa-calendar'}
/>

<Card 
  classCol={'col-md-6 mb-4'} 
  categoria={'Atendimento em capitação'} 
  essencial={'3'} 
  classBorderLeft={'success'} 
  calssRow={'no-gutters'}
  classComment={'fa-dollar-sign'}
/>

<Card 
  classCol={'col-md-6 mb-4'} 
  categoria={'Atendimento finalizado'} 
  essencial={'2'} 
  classBorderLeft={'info'} 
  calssRow={'no-gutters'}
  classComment={'fa-clipboard-list'}
/>

<Card 
  classCol={'col-md-6 mb-4'} 
  categoria={'Furos'} 
  essencial={'0'} 
  classBorderLeft={'warning'} 
  calssRow={'no-gutters'}
  classComment={'fa-comments'}
/>

</div>
        </div>
      </div>
    </div>
  );

}
export default Dashboard;
