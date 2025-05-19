import React, { useState, useEffect, useRef } from "react";
import OrderDetails from "./OrderDetails";
import { MoreVertical } from "lucide-react";

const mockOrders = [
  {
    id: "#6979",
    product: "DJI Mavic Pro 2",
    customer: "Alice Smith",
    date: "Apr 15, 2023",
    amount: "$42.00",
    status: "Delivered",
  },
  {
    id: "#6624",
    product: "iPad Pro 2017",
    customer: "Bob Jones",
    date: "Apr 17, 2023",
    amount: "$932.00",
    status: "Failed",
  },
  {
    id: "#3389",
    product: "Oneplus 10",
    customer: "John Doe",
    date: "Apr 18, 2023",
    amount: "$620.00",
    status: "Pending",
  },
  {
    id: "#4420",
    product: "Wooden Chair",
    customer: "Jane Smith",
    date: "Apr 19, 2023",
    amount: "$300.00",
    status: "Delivered",
  },
  {
    id: "#5781",
    product: "Face cream",
    customer: "Eva Green",
    date: "Apr 20, 2023",
    amount: "$813.00",
    status: "Out for delivery",
  },
  {
    id: "#8951",
    product: "Nike Jordan",
    customer: "Sam Turner",
    date: "Apr 21, 2023",
    amount: "$392.00",
    status: "Ready to pick up",
  },
];

export default function Transactions() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleDelete = (index) => {
    const updated = [...orders];
    updated.splice(index, 1);
    setOrders(updated);
    setOpenMenuIndex(null);
  };

  const updateStatus = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="mt-10 p-6 relative">
      {!selectedOrder ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Order Transactions</h2>
          <input
            type="text"
            placeholder="Search by product or order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 px-3 py-2 border rounded w-full max-w-sm"
          />

          <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto relative z-0">
            <table className="w-full text-left relative min-w-[600px]">
              <thead className="text-gray-600">{/* header rows */}</thead>
              <tbody>
                {paginatedOrders.map((order, i) => (
                  <tr
                    key={order.id}
                    className="h-20 border-b relative hover:bg-gray-50"
                  >
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.customer}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                          order.status === "Delivered"
                            ? "text-green-600 bg-green-100"
                            : order.status === "Pending"
                            ? "text-yellow-600 bg-yellow-100"
                            : order.status === "Out for delivery"
                            ? "text-blue-600 bg-blue-100"
                            : order.status === "Ready to pick up"
                            ? "text-indigo-600 bg-indigo-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td
                      className="relative z-50 w-32"
                      ref={i === openMenuIndex ? menuRef : null}
                    >
                      <button
                        onClick={() => toggleMenu(i)}
                        className="p-2 w-full text-left flex justify-between items-center hover:bg-gray-100 rounded-md border z-50 relative"
                      >
                        <span className="text-sm font-medium">Options</span>
                        <MoreVertical size={18} />
                      </button>
                      {openMenuIndex === i && (
                        <div
                          className="absolute z-50 right-0 mt-2 bg-white shadow-md rounded w-36 border max-w-[200px]
                          sm:max-w-[200px] xs:absolute xs:left-0 xs:right-auto xs:top-full xs:mt-1 xs:w-full"
                          style={{ minWidth: "150px" }}
                        >
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-blue-50 rounded-md text-sm font-medium text-blue-600"
                            onClick={() => {
                              setSelectedOrder(order);
                              setOpenMenuIndex(null);
                            }}
                          >
                            View Details
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded-b-md"
                            onClick={() => handleDelete(i)}
                          >
                            Delete Order
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
              <p className="text-sm text-gray-600">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  filteredOrders.length
                )}
                –{Math.min(currentPage * itemsPerPage, filteredOrders.length)}{" "}
                of {filteredOrders.length}
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
          onStatusChange={(newStatus) => {
            const index = orders.findIndex((o) => o.id === selectedOrder.id);
            updateStatus(index, newStatus);
            setSelectedOrder({ ...selectedOrder, status: newStatus });
          }}
        />
      )}
    </div>
  );
}
