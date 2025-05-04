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

export default function Sidebar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
      return newState;
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    setIsMounted(true);
    const collapsedStored = localStorage.getItem("sidebar-collapsed");
    if (collapsedStored) setCollapsed(JSON.parse(collapsedStored));
    const themeStored = localStorage.getItem("theme");
    if (themeStored) setTheme(themeStored);

    const index = navItems.findIndex(
      (item) =>
        `/admin/${item.path}` === location.pathname ||
        (item.path === "" && location.pathname === "/admin")
    );
    setActiveIndex(index >= 0 ? index : 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = window.innerWidth < 768;
  const isCollapsed = isMounted && !mobileOpen && collapsed && !hovered;
  const sidebarWidth = isCollapsed ? 80 : 256;

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50 px-4 py-3 h-16">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="transition-transform duration-200"
          >
            <Menu size={28} className="text-teal-700 dark:text-teal-400" />
          </button>
          <span className="text-lg font-bold text-teal-700 dark:text-teal-400">
            MMSUmerch
          </span>
        </div>
        <button type="button" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon size={24} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <Sun size={24} className="text-yellow-400" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ width: 256 }}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        className={`mt-15 pt-5 md:pt-2  md:mt-2 z-40 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md h-full shadow-xl fixed top-0 left-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 overflow-hidden flex flex-col`}
      >
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between p-4">
          {!isCollapsed && (
            <div className="text-xl font-bold text-teal-700 dark:text-teal-400 whitespace-nowrap">
              MMSUmerch
            </div>
          )}
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon size={20} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun size={20} className="text-yellow-400" />
              )}
            </button>
            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden md:block transition-transform duration-200"
            >
              <motion.div
                animate={{ rotate: collapsed ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft size={20} />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col relative overflow-y-auto pt-2">
          {/* Active Link indicator */}
          <motion.div
            layout
            className="absolute left-1 w-1 bg-teal-500 rounded-full z-10"
            initial={{ top: activeIndex * 43 + 12, height: 40 }}
            animate={{ top: activeIndex * 43 + 12, height: 40 }}
            transition={{ duration: 0.3 }}
          />

          {navItems.map(({ label, icon: Icon, path }, index) => {
            const fullPath = `/admin/${path}`;
            const isActive =
              location.pathname === fullPath ||
              (path === "" && location.pathname === "/admin");

            return (
              <Link
                to={fullPath}
                key={label}
                onClick={() => {
                  if (isMobile) setMobileOpen(false);
                  setActiveIndex(index);
                }}
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
        </nav>

        {/* Logout Button at Bottom */}
        <div className="p-2">
          <button
            type="button"
            onClick={handleLogout}
            className={`w-full group relative flex items-center ${
              isCollapsed ? "justify-center" : "justify-start"
            } gap-3 px-6 py-20 md:py-6 text-sm font-medium text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md hover:text-red-500`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Main Content with proper spacing */}
      <main
        className={`md:pl-4 mt-30 md:pt-0 transition-all duration-300 min-h-screen ${
          isMounted ? (isCollapsed ? "md:pl-4" : "md:pl-48") : "md:pl-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
