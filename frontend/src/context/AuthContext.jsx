// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/sesiones/current", {
          credentials: "include"
        });

        const data = await res.json();
        
        if (data.status === "success") {
          setIsAuthenticated(true);
          
          setUser(data.payload); // 👈 muy importante
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{  isAuthenticated,
      setIsAuthenticated,  // 👈 esto faltaba
      user,
      setUser   }}>
      {children}
    </AuthContext.Provider>
  );
}
