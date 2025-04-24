import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Package,
  Folder,
} from "lucide-react";

const navItems = [
  { label: "Summary", icon: LayoutDashboard, path: "." },
  { label: "Transaction", icon: CreditCard, path: "transactions" },
  { label: "Product", icon: Package, path: "products" },
  { label: "Category", icon: Folder, path: "categories" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white h-full shadow-lg">
      <div className="p-6 text-xl font-bold text-indigo-600">O2O Brand Protector</div>
      <nav className="mt-6">
        {navItems.map(({ label, icon: Icon, path }) => (
          <Link
            to={path}
            key={label}
            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-indigo-100 ${
              location.pathname.endsWith(path) ? "bg-indigo-100 text-indigo-700" : "text-gray-600"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}