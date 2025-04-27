import React from "react";

const OrderSummarySection = ({ currentPage, setCurrentPage }) => (
  <section className="bg-white p-6 shadow rounded-xl">
    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div>
        <p className="font-bold text-lg">18</p>
        <p className="text-sm text-gray-500">Total Orders</p>
      </div>
      <div>
        <p className="font-bold text-lg">2</p>
        <p className="text-sm text-gray-500">Ongoing</p>
      </div>
      <div>
        <p className="font-bold text-lg">$1230</p>
        <p className="text-sm text-gray-500">Money Spent</p>
      </div>
    </div>
    <h3 className="text-lg font-semibold mt-4 mb-2">Order History</h3>
    <ul className="space-y-2">
      {[1, 2, 3, 4, 5].map((id) => (
        <li key={id} className="flex justify-between bg-gray-50 p-4 rounded-md">
          <span>Order #{1000 + id}</span>
          <span>Status: Delivered</span>
        </li>
      ))}
    </ul>
    <div className="flex justify-center gap-4 mt-4">
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      <span>{currentPage}</span>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </div>
  </section>
);

export default OrderSummarySection;
