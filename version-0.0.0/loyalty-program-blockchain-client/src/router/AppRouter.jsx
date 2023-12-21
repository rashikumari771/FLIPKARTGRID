import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Partner from "../pages/Partner/Partner";
import Owner from "../pages/Owner/Owner";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/partner" element={<Partner />} />
      <Route path="/owner" element={<Owner />} />
    </Routes>
  );
};

export default AppRouter;
