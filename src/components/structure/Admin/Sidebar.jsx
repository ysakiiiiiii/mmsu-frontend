import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleSidebar = () => {
    setCollapsed(prev => {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(!prev));
      return !prev;
    });
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const collapsedStored = localStorage.getItem("sidebar-collapsed");
    if (collapsedStored) setCollapsed(JSON.parse(collapsedStored));
    const themeStored = localStorage.getItem("theme");
    if (themeStored) setTheme(themeStored);
  }, []);

  const isCollapsed = collapsed && !hovered;
  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleMobileMenu}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ width: 256 }}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`bg-white/60 dark:bg-gray-900/50 backdrop-blur-md h-full shadow-xl fixed top-0 left-0 z-40 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 mt-20">
          {!isCollapsed && (
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
              MMSU MERCH
            </div>
          )}
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme}>
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={toggleSidebar} className="hidden md:block">
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>
          {/* Close button for mobile */}
          <button onClick={toggleMobileMenu} className="md:hidden">
            ✖
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-6 flex flex-col gap-1 relative">
          {/* Active Link Indicator */}
          <motion.div
            layout
            className="absolute left-0 w-1 bg-indigo-500 rounded-full"
            style={{
              top: navItems.findIndex(
                item => `/admin/${item.path}` === location.pathname
              ) * 56 + 24, // 56px per item (padding + height), 24px offset
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
                    ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />

                {!isCollapsed && <span>{label}</span>}

                {isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-gray-800 dark:bg-gray-600 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap pointer-events-none group-hover:opacity-100"
                  >
                    {label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </div>
  );
}
