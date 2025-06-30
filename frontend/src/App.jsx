import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./Components/Register/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Pokedex from "./Components/pokedex/pokedex";
import PanelEdicion from "./Components/PanelEdicion/PanelEdicion";
import CrearUsuario from "./Components/CrearUsuario/CrearUsuario";
import EditarUsuario from "./Components/EditarUsuario/EditarUsuario";

import RutaPorRol from "./Components/Routes/RutaPorRol";
import RutaInvitado from "./Components/Routes/RutaInvitado";
import RutaPrivada from "./Components/Routes/RutaPrivada";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas para usuarios no logueados */}
          <Route
            path="/login"
            element={
              <RutaInvitado>
                <Login />
              </RutaInvitado>
            }
          />
          <Route
            path="/register"
            element={
              <RutaInvitado>
                <Register />
              </RutaInvitado>
            }
          />

          {/* Rutas privadas protegidas */}
          <Route
            path="/home"
            element={
              <RutaPrivada>
                <Navbar />
                <Home />               
              </RutaPrivada>
            }
          />
          <Route
            path="/pokedex"
            element={
              <RutaPrivada>
                <Navbar />
                <Pokedex />
              </RutaPrivada>
            }
          />
          <Route
            path="/panel-admin"
            element={
              <RutaPorRol rolesPermitidos={["ADMIN","EDITOR"]}>
                <Navbar />
                <PanelEdicion />
                
              </RutaPorRol>
            }
          />
          <Route
            path="/crear-usuario"
            element={
              <RutaPorRol rolesPermitidos={["ADMIN","EDITOR"]}>
                <Navbar />
                
                <CrearUsuario />
              </RutaPorRol>
            }
          />
          <Route
            path="/editar-usuario/:id"
            element={
              <RutaPorRol rolesPermitidos={["ADMIN","EDITOR"]}>
                <Navbar />
                
                <EditarUsuario />
              </RutaPorRol>
            }
          />
         
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

