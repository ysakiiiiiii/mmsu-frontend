import React from "react";

const OrderSummarySection = ({ currentPage, setCurrentPage }) => (
  <section className="bg-white p-3 shadow rounded-lg">
    <h2 className="text-base font-bold mb-2">Order Summary</h2>
    <div className="grid grid-cols-3 gap-1 mb-3">
      <div className="p-1 text-center">
        <p className="font-bold text-sm">18</p>
        <p className="text-xs text-gray-500">Orders</p>
      </div>
      <div className="p-1 text-center">
        <p className="font-bold text-sm">2</p>
        <p className="text-xs text-gray-500">Ongoing</p>
      </div>
      <div className="p-1 text-center">
        <p className="font-bold text-sm">$1230</p>
        <p className="text-xs text-gray-500">Spent</p>
      </div>
    </div>
    
    <h3 className="text-sm font-semibold mt-3 mb-1">Order History</h3>
    <ul className="space-y-1">
      {[1, 2, 3].map((id) => (
        <li key={id} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded">
          <span>#{1000 + id}</span>
          <span className="text-green-600">Delivered</span>
        </li>
      ))}
    </ul>
    
    <div className="flex justify-center items-center gap-2 mt-3 text-xs">
      <button 
        onClick={() => setCurrentPage(currentPage - 1)} 
        disabled={currentPage === 1}
        className="px-2 py-1 bg-gray-100 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-2">{currentPage}</span>
      <button 
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-2 py-1 bg-gray-100 rounded"
      >
        Next
      </button>
    </div>
  </section>
);

export default OrderSummarySection;