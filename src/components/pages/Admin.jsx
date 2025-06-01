import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "../structure/Admin/Sidebar";
import Dashboard from "../structure/Admin/Dashboard";
import Transactions from "../structure/Admin/Transactions";
import Products from "../structure/Admin/Products";
import AdminRoute from "../structure/Admin/AdminRoute";

export function Admin() {
  return (
    <AdminRoute>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto md:pl-5 bg-transparent">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      </div>
    </AdminRoute>
  );
}

export default Admin;
