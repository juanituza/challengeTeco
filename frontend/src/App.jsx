import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./Components/Register/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/home/Home";
import Navbar from "./Components/Navbar/Navbar";
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
          {/* Puedes agregar más rutas privadas */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

