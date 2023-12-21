import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import HomePage from "pages/HomePage.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
