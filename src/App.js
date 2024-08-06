import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

import NoteState from "./context/notes/NoteState";
import Alert from "./components/shared/Alert";
import PATH from "./constants/path";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <div>
            <Navbar />
            <Alert message={alert?.msg} type={alert?.type} />
            <div className="container" style={{marginTop: "130px"}}>
              <Routes>
                {/* Default Route */}
                <Route exact path="/" element={<Home showAlert={showAlert} />} />
                <Route exact path={PATH.login} element={<Login showAlert={showAlert} />} />
                <Route exact path={PATH.signUp} element={<SignUp showAlert={showAlert} />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
