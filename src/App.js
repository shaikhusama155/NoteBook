import "./App.css";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <NoteState>
    <>
    <BrowserRouter>
      <Navbar/>
      <br />
      <br />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element ={<About/>}/>
        </Routes>
      </div>
      </BrowserRouter>
    </>
    </NoteState>
  );
}

export default App;
