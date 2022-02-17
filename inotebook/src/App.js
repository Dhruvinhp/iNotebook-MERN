import "./App.css";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Singup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <NoteState>
      <Header />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/singup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
