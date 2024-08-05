import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

import NoteState from "./context/notes/NoteState";
import Alert from "./components/shared/Alert";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <div>
            <Navbar />
            <Alert message=""/>
            <div className="container">
              <Routes>
                {/* Default Route */}
                <Route exact path="/" element={<Home />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
