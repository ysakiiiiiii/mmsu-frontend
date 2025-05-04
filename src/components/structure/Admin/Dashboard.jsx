import React from "react";

export default function Dashboard() {
  return (
   
    <div className="mt-17 md:mt-0">
      <h1 className="text-2xl font-bold mb-6">Business Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-sm font-medium text-gray-600">Customers</h2>
          <p className="text-2xl font-bold text-indigo-600">54,235</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-sm font-medium text-gray-600">Income</h2>
          <p className="text-2xl font-bold text-indigo-600">$980,632</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-sm font-medium text-gray-600">Products Sold</h2>
          <p className="text-2xl font-bold text-indigo-600">5,490</p>
        </div>
      </div>
    </div>
  );
}
