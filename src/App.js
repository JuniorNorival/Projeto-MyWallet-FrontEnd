import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import GlobalStyle from "./styles/GlobalStyle";
import SignUp from "./components/SignUp/SignUp";
import Wallet from "./components/Wallet/Wallet";
import NewInn from "./components/NewInn/NewInn";
import NewOut from "./components/NewOut/NewOut";
function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/newinn" element={<NewInn />} />
        <Route path="/newout" element={<NewOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
