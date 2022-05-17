import {useContext } from 'react'

import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'


import ReactModal from 'react-modal'
import { FiShoppingCart, FiEdit, FiX } from 'react-icons/fi'
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';

import './style.css';
import UserForm from '../../components/UserForm/UserForm'



function Cadastro() {

  const { user } = useContext(AuthContext);
  
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Title nome="Cadastro de profissionais">
          <HowToRegSharpIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
        </Title>
        <div className="container-dash">
          <UserForm />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
