import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "../structure/Admin/Sidebar";
import Dashboard from "../structure/Admin/Dashboard";
import Transactions from "../structure/Admin/Transactions";
import Products from "../structure/Admin/Products";
import Categories from "../structure/Admin/Category";
import AdminRoute from "../structure/Admin/AdminRoute";

export  function Admin() {
  return (
    <AdminRoute>
      <div className="flex h-screen overflow-hidden">    
        <Sidebar />
        <main className="flex-1 bg-[#f4f6fa] p-6 overflow-y-auto md:pl-25">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </main>
      </div>
    </AdminRoute>
  );
}


export default Admin