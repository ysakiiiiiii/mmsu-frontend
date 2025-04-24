import React, { useState } from "react";

const mockOrders = [
  { id: "#1235465", product: "DJI Mavic Pro 2", date: "Sep 16, 2021", amount: "$42.00", status: "Delivered" },
  { id: "#1235468", product: "iPad Pro 2017", date: "Sep 15, 2021", amount: "$932.00", status: "Canceled" },
];

export default function Transactions() {
  const [orders, setOrders] = useState(mockOrders);

  const updateStatus = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Transactions</h2>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order.id} className="border-t">
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(i, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option>Delivered</option>
                    <option>Pending</option>
                    <option>Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
