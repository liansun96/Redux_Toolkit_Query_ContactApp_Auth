import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Nav from "../components/Nav";
import Guard from "../components/Guard";
import CreateContact from "../components/CreateContact";
import EditContact from "../components/EditContact";
import SingleContactInfo from "../components/SingleContactInfo";
import ChangePassword from "../components/ChangePassword";
import Pagination from "../components/pagination";

const path = () => {
  return (
    <Routes>
      <Route path="/" element={<Guard><Dashboard /></Guard>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createContact" element={<CreateContact />} />
      <Route path="/editContact/:id" element={<EditContact />} />
      <Route path="/singleContactInfo/:id" element={<SingleContactInfo/>} />
      <Route path="/changepassword" element={<ChangePassword/>}/>
      <Route path="/pagination" element={<Pagination/>}/>
    </Routes>
  );
};

export default path;
