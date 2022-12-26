import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { useContext } from "react";
import { TokenContext } from "./context/token-context";
import Private from "./route/Private/Private";
import Public from "./route/Public/Public";

function App() {
  const { token } = useContext(TokenContext);

  if (token) {
    return <Private />;
  }
  return <Public />;
}

export default App;
