import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Package,
  Folder,
  ChevronLeft,
  ChevronRight,
  Menu,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "" },
  { label: "Transaction", icon: CreditCard, path: "transactions" },
  { label: "Product", icon: Package, path: "products" },
  { label: "Category", icon: Folder, path: "categories" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(!prev));
      return !prev;
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  useEffect(() => {
    const collapsedStored = localStorage.getItem("sidebar-collapsed");
    if (collapsedStored) setCollapsed(JSON.parse(collapsedStored));
    const themeStored = localStorage.getItem("theme");
    if (themeStored) setTheme(themeStored);
  }, []);

  const isMobile = window.innerWidth < 768;
  const isCollapsed = !mobileOpen && collapsed && !hovered;
  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50 px-4 py-3">
        <div className="flex items-center gap-3">
          <button type="button" onClick={toggleMobileMenu}>
            <Menu size={28} className="text-teal-700" />
          </button>
          <span className="text-lg font-bold text-teal-700">MMSUmerch</span>
        </div>
        <button type="button" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ width: 256 }}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`bg-white/60 dark:bg-gray-900/60 backdrop-blur-md h-full shadow-xl fixed top-0 left-0 z-40 pt-20
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 overflow-hidden`}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between p-6">
          {!isCollapsed && (
            <div className="text-xl font-bold text-teal-700 dark:text-teal-400 whitespace-nowrap">
              MMSUmerch
            </div>
          )}
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleTheme}>
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button type="button" onClick={toggleSidebar} className="hidden md:block">
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="mt-4 flex flex-col gap-1 relative">
          {/* Active Link indicator */}
          <motion.div
            layout
            className="absolute left-1 w-1 bg-teal-500 rounded-full z-100"
            style={{
              top:
                navItems.findIndex(
                  (item) => `/admin/${item.path}` === location.pathname
                ) *
                  48 +
                3,
              height: 40,
            }}
            transition={{ duration: 0.3 }}
          />

          {navItems.map(({ label, icon: Icon, path }) => {
            const fullPath = `/admin/${path}`;
            const isActive = location.pathname === fullPath;

            return (
              <Link
                to={fullPath}
                key={label}
                onClick={() => setMobileOpen(false)}
                className={`group relative flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span>{label}</span>}
              </Link>
            );
          })}

          {/* Logout Button * /}
          <div className="mb-6 px-6">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-sm font-medium text-red-600 hover:text-red-700 dark:hover:text-red-400 transition-all"
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span>Log out</span>}
            </button>
          </div>
        </nav>
      </motion.aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </div>
  );
}
