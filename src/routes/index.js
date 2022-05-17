
import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Cadastro from '../pages/Cadastro'
import Portal from '../pages/Portal'
import Importador from '../pages/Importador'
import Forgot from '../pages/Forgot';


import RequireAuth from './requireAuth'


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
        path="/importador"
        element={
          <RequireAuth redirectTo="/" isPrivate>
            <Importador />
          </RequireAuth>
        }
      />
      <Route
        path="/cadastro"
        element={
          <RequireAuth redirectTo="/" isPrivate>
            <Cadastro />
          </RequireAuth>
        }
      />

    </Routes>
  )
}