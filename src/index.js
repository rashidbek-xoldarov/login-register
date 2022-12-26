import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TokenProvider } from "./context/token-context";
import { AuthProvider } from "./context/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TokenProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </TokenProvider>
  </BrowserRouter>,
);
