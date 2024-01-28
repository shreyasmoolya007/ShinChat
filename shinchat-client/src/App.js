import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./components/Register";
import Chat from "./components/Chat";
import Login from "./components/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
