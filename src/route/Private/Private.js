import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import HeaderPrivate from "../../components/HeaderPirvate/HeaderPrivate";
import PrivateHome from "../../components/PrivateHome/PrivateHome";
import PrivatePostes from "../../components/PrivatePostes/PrivatePostes";
import Settings from "../../components/Settings/Settings";
import SinglePost from "../../components/SinglePost/SinglePost";

const Private = () => {
  return (
    <div>
      <HeaderPrivate />
      <Routes>
        <Route path="/" element={<PrivateHome />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/posts" element={<PrivatePostes />} />
        <Route path="/posts/:id" element={<SinglePost />} />
      </Routes>
    </div>
  );
};

export default Private;
