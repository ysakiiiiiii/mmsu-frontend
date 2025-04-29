import React from "react";

const PaymentSection = ({ isEditing, toggleEdit }) => (
  <section className="bg-white p-6 shadow rounded-xl">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">Payment Methods</h2>
      <button onClick={toggleEdit} className="text-blue-600 text-sm">
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
    <p>No saved payment methods.</p>
    <button className="text-blue-500 text-sm mt-2">Add Payment Method</button>
  </section>
);

export default PaymentSection;