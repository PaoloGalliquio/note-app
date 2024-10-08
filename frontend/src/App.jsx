import "./App.css";
import { AuthProvider } from "./hooks/context/authContext";
import { Main } from "./pages/main/main";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
