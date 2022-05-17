import { useEffect, useState, useContext, useCallback } from 'react'

import { AuthContext } from '../../contexts/auth'
import { SimulationContext } from '../../contexts/simulation';
import Header from '../../components/Header'
import Title from '../../components/Title'

import { listarCategoria } from '../../services/lists'

import ReactModal from 'react-modal'

import { FiTrendingUp, FiEdit, FiX } from 'react-icons/fi'
import './style.css';
import { toast, ToastContainer } from 'react-toastify';


function Portal() {

  const { user } = useContext(AuthContext);
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
