// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/sesiones/current", {
          credentials: "include"
        });

        const data = await res.json();
        
        setIsAuthenticated(
  data.status === "success" ||
  (data.status === "error" && data.message.includes("Ya estás autenticado"))
);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
