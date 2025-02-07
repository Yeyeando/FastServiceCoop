// src/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainWaiter from "./pages/MainWaiter";
import MenuWaiter from "./pages/MenuWaiter";
import DishesWaiter from "./pages/DishesWaiter";
import Confirmation from "./pages/Confirmation";
import PickUp from "./pages/PickUp";
import { DishProvider } from "./pages/DishContext";

const AppRouter: React.FC = () => {
  return (
    <DishProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainWaiter />} />
          <Route path="/MenuWaiter/:table" element={<MenuWaiter />} />
          <Route path="/DishesWaiter/:table?/:id" element={<DishesWaiter />} />
          <Route path="/Confirmation/:table?/:id?" element={<Confirmation />} />
          <Route path="/PickUp" element={<PickUp />} />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </Router>
    </DishProvider>
  );
};

export default AppRouter;
