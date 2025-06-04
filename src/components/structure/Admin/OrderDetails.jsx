import React, { useEffect, useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "", ...props }) => (
  <div
    className={`flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const OrderDetails = ({ order, onBack, onStatusChange, onDelete }) => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(order.status || "Pending");

  useEffect(() => {
    if (!order?.id) return;

    async function fetchOrder() {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost/MMSU/mmsu-backend/transactions/orders_api.php?id=${order.id}`
        );
        if (!res.ok) throw new Error("Failed to fetch order data");
        const data = await res.json();
        setOrderData(data);

        // Fix: Properly map the status from backend to frontend
        const statusMapping = {
          pending: "Pending",
          failed: "Failed",
          "out for delivery": "Out for delivery",
          "ready to pick up": "Ready to pick up",
          delivered: "Delivered",
        };

        const frontendStatus = statusMapping[data.status] || "Pending";
        setCurrentStatus(frontendStatus);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [order]);

  const handleStatusChange = async (newStatus) => {
    if (!order?.id) return;

    try {
      // Optimistically update the UI
      setCurrentStatus(newStatus);

      // Call the API to update the status
      const response = await onStatusChange(newStatus);

      if (!response) {
        // Revert if the API call failed
        setCurrentStatus(order.status);
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      setCurrentStatus(order.status);
      alert(error.message || "Error updating status");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await onDelete(order.id);
        onBack();
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };

  if (loading) return <div className="p-6">Loading order details...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!orderData) return <div className="p-6">No order found.</div>;

  const transformedData = {
    id: String(orderData.id),
    products: (orderData.products || []).map((product) => ({
      ...product,
      price: String(product.price),
      quantity: String(product.quantity),
    })),
    customer: {
      id: String(orderData.id),
      name: String(orderData.customer || "Unknown Customer"),
      email: String(orderData.customer_details?.email || "No email provided"),
      mobile: String(orderData.customer_details?.mobile || "No phone provided"),
      order_count: String(orderData.customer_details?.order_count || "0"),
      avatar: String(
        orderData.customer_details?.avatar ||
          "http://localhost/MMSU/mmsu-backend/assets/default-avatar.png"
      ),
    },
    shipping_address: {
      line1: String(
        orderData.shipping_address?.line1 ||
          orderData.shipping_address?.address ||
          "No address provided"
      ),
      city: String(orderData.shipping_address?.city || ""),
      province: String(orderData.shipping_address?.province || ""),
      postal_code: String(
        orderData.shipping_address?.postal_code ||
          orderData.shipping_address?.zip_code ||
          ""
      ),
      country: String(orderData.shipping_address?.country || ""),
    },
    status: currentStatus,
    tax: "0",
    discount: "0",
    created_at: orderData.date || new Date().toISOString(),
  };

  const {
    products,
    customer,
    shipping_address,
    tax = "0",
    discount = "0",
    created_at,
  } = transformedData;

  const subtotal = products.reduce(
    (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
    0
  );
  const total = subtotal - parseFloat(discount) + parseFloat(tax);

  const statuses = [
    { value: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "Failed", color: "bg-red-100 text-red-800" },
    { value: "Out for delivery", color: "bg-blue-100 text-blue-800" },
    { value: "Ready to pick up", color: "bg-indigo-100 text-indigo-800" },
    { value: "Delivered", color: "bg-green-100 text-green-800" },
  ];

  const currentStatusObj = statuses.find((s) => s.value === currentStatus) || {
    value: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="p-6 space-y-4 font-Poppins">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 mb-4 hover:underline"
      >
        <ArrowLeft className="mr-2" size={16} /> Back to Orders
      </button>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Order {order.id}</h2>
          <div className="flex gap-2 items-center">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${currentStatusObj.color}`}
            >
              {currentStatusObj.value}
            </span>
            <select
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="ml-2 px-2 py-1 border rounded text-sm"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.value}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(created_at).toLocaleString()}
          </p>
        </div>
        <Button
          className="border border-red-500 text-red-500 hover:bg-red-50 gap-2"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4" /> Delete Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="md:col-span-2">
          <CardHeader>
            <h3 className="font-medium text-lg">Order details</h3>
          </CardHeader>
          <CardContent className="px-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">PRODUCTS</th>
                    <th className="py-2 text-left">PRICE</th>
                    <th className="py-2 text-left">QTY</th>
                    <th className="py-2 text-left">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 flex gap-4 items-center">
                        <img
                          src={item.img || "https://via.placeholder.com/50"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-muted-foreground text-xs">
                            {item.description || "No description"}
                          </div>
                        </div>
                      </td>
                      <td>P{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        P
                        {(
                          parseFloat(item.price) * parseInt(item.quantity)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-2 text-sm text-left">
              <p>
                Subtotal: <strong>P{subtotal.toFixed(2)}</strong>
              </p>
              <p>
                Discount: <strong>P{parseFloat(discount).toFixed(2)}</strong>
              </p>
              <p>
                Tax: <strong>P{parseFloat(tax).toFixed(2)}</strong>
              </p>
              <p className="text-base">
                Total: <strong>P{total.toFixed(2)}</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-medium text-lg">Customer details</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={customer.avatar}
                  alt="Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-muted-foreground text-sm">
                    Customer ID: #{customer.id}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs">
                  {customer.order_count} Orders
                </span>
              </div>
              <div className="text-sm">
                <p>Email: {customer.email}</p>
                <p>Mobile: {customer.mobile}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-medium text-lg">Shipping address</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {shipping_address.line1}
                <br />
                {shipping_address.city && `${shipping_address.city}, `}
                {shipping_address.province && `${shipping_address.province}, `}
                {shipping_address.postal_code &&
                  `${shipping_address.postal_code}`}
                <br />
                {shipping_address.country}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
