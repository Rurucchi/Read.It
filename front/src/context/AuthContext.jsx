import { createContext } from "react";
import { useState, useEffect } from "react";

//api
import tryLogin from "../api/user/tryLogin";

// REACT CONTEXT

export const AuthContext = createContext(false);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    (async () => {
      let auth = await tryLogin();
      setAuthState(auth);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
