import React from "react";
import Header from "../../components/Header/Header";
import Home from "../../components/Home/Home";
import Login from "../../components/Login/Login";
import Ragister from "../../components/Register/Ragister";
import { Routes, Route } from "react-router-dom";

const Public = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Ragister />} />
        <Route path="*" element={<h2>Error</h2>} />
      </Routes>
    </>
  );
};

export default Public;
