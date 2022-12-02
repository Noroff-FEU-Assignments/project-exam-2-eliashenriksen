import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useLocalStorage("authentication", null);
  const [user, setUser] = useLocalStorage("user", null);
  return <AuthContext.Provider value={[auth, setAuth, user, setUser]}>{props.children}</AuthContext.Provider>
};

export default AuthContext;