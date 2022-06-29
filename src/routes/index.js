
import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import CadastroProfissional from '../pages/CadastroProfissional'
import Portal from '../pages/Portal'
import ImportarProfissional from '../pages/ImportarProfissional'
import ImportarPaciente from '../pages/ImportarPaciente'
import CadastroConvenio from '../pages/CadastroConvenio';
import CadastroFrequencia from '../pages/CadastroFrequencia';

import Forgot from '../pages/Forgot';


import RequireAuth from './requireAuth'
import CadastroPaciente from '../pages/CadastroPaciente';


export default function Rotas() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth redirectTo="/portal">
            <SignIn />
          </RequireAuth>
        }
      />

      <Route
        path="/register"
        element={
          <RequireAuth redirectTo="/portal">
            <SignUp />
          </RequireAuth>
        }
      />

      <Route
        path="/forgot"
        element={
          <RequireAuth redirectTo="/portal">
            <Forgot />
          </RequireAuth>
        }
      />

      <Route
        path="/dashboard"
        element={

          <RequireAuth redirectTo="/" isPrivate>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/perfil"
        element={
          <RequireAuth redirectTo="/" isPrivate>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/portal"
        element={
          <RequireAuth redirectTo="/" isPrivate>
            <Portal />
          </RequireAuth>
        }
      />
      <Route
        path="/importarPaciente"
        element={
          <RequireAuth redirectTo="/" isPrivate>
            <ImportarPaciente />
          </RequireAuth>
        }
      />

      <Route
        path="/importarProfissional"
        element={
          <RequireAuth redirectTo="/" isPrivate>
            <ImportarProfissional />
          </RequireAuth>
        }
      />


      <Route
        path="/cadastroProfissional"
        element={
          <RequireAuth redirectTo="/" isPrivate>
            <CadastroProfissional />
          </RequireAuth>
        }
      />
      <Route
        path="/cadastroPaciente"
        element={
          <RequireAuth redirectTo="/" isPrivate>
            <CadastroPaciente />
          </RequireAuth>
        }
      />

      <Route
        path="/cadastroConvenio"
        element={
          <RequireAuth redirectTo="/" isPrivate>
            <CadastroConvenio />
          </RequireAuth>
        }
      />

      <Route
        path="/cadastroFrequencia"
        element={
          <RequireAuth redirectTo="/" isPrivate>
            <CadastroFrequencia />
          </RequireAuth>
        }
      />

    </Routes>
  )
}