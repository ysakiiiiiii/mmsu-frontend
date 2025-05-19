import React from "react";
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

const OrderDetails = ({ order, onBack, onStatusChange }) => {
  const products = [
    {
      name: "Face cream",
      description: "Gender: Women",
      price: 813,
      quantity: 2,
      img: "/products/face-cream.png",
    },
    {
      name: "Nike Jordan",
      description: "Size: 8UK",
      price: 392,
      quantity: 1,
      img: "/products/nike-jordan.png",
    },
    {
      name: "Oneplus 10",
      description: "Storage: 128gb",
      price: 896,
      quantity: 3,
      img: "/products/oneplus-10.png",
    },
    {
      name: "Wooden Chair",
      description: "Material: Wooden",
      price: 841,
      quantity: 2,
      img: "/products/wooden-chair.png",
    },
  ];

  const statuses = [
  "Pending",
  "Paid",
  "Delivered",
  "Failed",
  "Out for delivery",
  "Ready to pickup",
];


  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = 100;
  const discount = 0;
  const total = subtotal - discount + tax;
  const currentStatus = order?.status || "Pending";

  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 mb-4 hover:underline"
      >
        <ArrowLeft className="mr-2" size={16} /> Back to Orders
      </button>

      {/* Header with status toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Order {order.id}</h2>
          <div className="flex gap-2">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium
              ${
                currentStatus === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : currentStatus === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : currentStatus === "Failed"
                  ? "bg-red-100 text-red-800"
                  : currentStatus === "Out for delivery"
                  ? "bg-blue-100 text-blue-800"
                  : currentStatus === "Ready to pick up"
                  ? "bg-indigo-100 text-indigo-800"
                  : "bg-gray-100 text-gray-800"
              }
            `}
            >
              {currentStatus}
            </span>
            <select
              value={currentStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="ml-4 px-2 py-1 border rounded text-sm"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-muted-foreground">
            Aug 17, 2025, 5:48 (ET)
          </p>
        </div>

        <Button className="border border-red-500 text-red-500 hover:bg-red-50 gap-2">
          <Trash2 className="w-4 h-4" /> Delete Order
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <h3 className="font-medium text-lg">Order details</h3>
            <Button className="text-violet-600 p-0 h-auto">Edit</Button>
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
                          src={item.img}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-muted-foreground text-xs">
                            {item.description}
                          </div>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-1 text-sm text-right">
              <p>
                Subtotal: <strong>${subtotal.toFixed(2)}</strong>
              </p>
              <p>
                Discount: <strong>${discount.toFixed(2)}</strong>
              </p>
              <p>
                Tax: <strong>${tax.toFixed(2)}</strong>
              </p>
              <p className="text-base">
                Total: <strong>${total.toFixed(2)}</strong>
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
                  src="/avatar.png"
                  alt="Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">Shamus Tuttle</div>
                  <div className="text-muted-foreground text-sm">
                    Customer ID: #58909
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs">
                  12 Orders
                </span>
              </div>
              <div className="text-sm">
                <p>Email: Shamus889@yahoo.com</p>
                <p>Mobile: +1 (609) 972-22-22</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-medium text-lg">Shipping address</h3>
              <Button className="text-violet-600 p-0 h-auto">Edit</Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                45 Roker Terrace
                <br />
                Latheronwheel
                <br />
                KW5 8NW, London
                <br />
                UK
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
