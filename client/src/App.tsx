import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/HomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
