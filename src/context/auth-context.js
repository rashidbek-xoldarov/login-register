import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [me, setMe] = useState(JSON.parse(localStorage.getItem("me")) || "");

  if (me) {
    localStorage.setItem("me", JSON.stringify(me));
  } else {
    localStorage.removeItem("me");
  }

  return (
    <AuthContext.Provider value={{ me, setMe }}>
      {children}
    </AuthContext.Provider>
  );
};
