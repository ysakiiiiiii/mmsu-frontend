import React, { useState, useEffect, useRef } from "react";
import OrderDetails from "./OrderDetails";
import { MoreVertical } from "lucide-react";

const API_URL =
  "http://localhost/MMSU/mmsu-backend/transactions/orders_api.php";

export default function Transactions() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: itemsPerPage, search });
      const response = await fetch(`${API_URL}?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();

      // Convert numeric values to strings
      const processedOrders = (data.data || []).map((order) => ({
        ...order,
        id: String(order.id),
        amount: String(order.amount),
        status: String(order.status || "Pending"),
      }));

      setOrders(processedOrders);
      setTotalPages(data.total_pages || 1);
      setCurrentPage(data.page || 1);
    } catch (error) {
      console.error(error);
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}?id=${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order");
      }

      await fetchOrders(currentPage, searchTerm);
      return true;
    } catch (error) {
      console.error(error);
      alert(error.message || "Error deleting order");
      return false;
    }
  };

    const updateStatus = async (orderId, newStatus) => {
      try {
        const response = await fetch(`${API_URL}?id=${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to update status");
        }

        // Refresh the orders list
        await fetchOrders(currentPage, searchTerm);
        
        // Return true to indicate success
        return true;
      } catch (error) {
        console.error("Update error:", error);
        alert(error.message || "Error updating status");
        return false;
      }
    };

  const handleStatusChange = async (newStatus) => {
    if (!selectedOrder) return;
    return await updateStatus(selectedOrder.id, newStatus);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="mt-10 p-6 relative font-Poppins">
      {!selectedOrder ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Order Transactions</h2>
          <input
            type="text"
            placeholder="Search by order ID or customer"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="mb-4 px-3 py-2 border rounded w-full max-w-sm"
          />

          <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto relative z-0">
            {loading ? (
              <p>Loading...</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No orders found.</p>
            ) : (
              <table className="w-full text-left relative min-w-[800px]">
                <thead className="text-gray-600">
                  <tr className="border-b h-12">
                    <th>ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr
                      key={order.id}
                      className="h-20 border-b relative hover:bg-gray-50"
                    >
                      <td>{`#${order.id}`}</td>
                      <td>{order.date}</td>
                      <td>{order.customer}</td>
                      <td>{order.amount}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-xl text-sm whitespace-nowrap ${
                            order.status.toLowerCase() === "delivered"
                              ? "text-green-600 bg-green-100"
                              : order.status.toLowerCase() === "pending"
                              ? "text-yellow-600 bg-yellow-100"
                              : order.status.toLowerCase() ===
                                "out for delivery"
                              ? "text-blue-600 bg-blue-100"
                              : order.status.toLowerCase() ===
                                "ready to pick up"
                              ? "text-indigo-600 bg-indigo-100"
                              : "text-red-600 bg-red-100"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="relative w-32">
                        <div
                          className="relative"
                          ref={i === openMenuIndex ? menuRef : null}
                        >
                          <button
                            onClick={() => toggleMenu(i)}
                            className="p-2 w-full text-left flex justify-between items-center hover:bg-gray-100 rounded-md border"
                          >
                            <span className="text-sm font-medium">Options</span>
                            <MoreVertical size={18} />
                          </button>
                          {openMenuIndex === i && (
                            <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-36 border z-[999]">
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-blue-50 rounded-t-md text-sm font-medium text-blue-600"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setOpenMenuIndex(null);
                                }}
                              >
                                View Details
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded-b-md"
                                onClick={async () => {
                                  const success = await handleDelete(order.id);
                                  if (success) {
                                    setOpenMenuIndex(null);
                                  }
                                }}
                              >
                                Delete Order
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1}–
                {Math.min(currentPage * itemsPerPage, orders.length)} of{" "}
                {orders.length}
              </p>
              <div className="space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx + 1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === idx + 1 ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <OrderDetails
          order={selectedOrder}
          onBack={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
