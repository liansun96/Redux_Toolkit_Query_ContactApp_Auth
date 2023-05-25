import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Nav from "../components/Nav";
import Guard from "../components/Guard";

const path = () => {
  return (
    <Routes>
      <Route path="/" element={<Guard><Dashboard /></Guard>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default path;
