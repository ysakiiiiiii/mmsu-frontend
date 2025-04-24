import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../auth/AuthWrapper";
import { nav } from "./navigation";
import { PiHorseLight } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import IconButton from "./IconButtons";

export const RenderMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRole = user.isAuthenticated ? user.role : "guest";
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
  
    if (isMobileMenuOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }
  
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);
  

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const MenuItem = ({ r }) => (
    <li>
      <Link
        to={r.path}
        className="inline-block py-1 px-3 hover:text-green-700 font-medium transform transition-transform duration-300 hover:scale-105"
      >
        {r.name}
      </Link>
    </li>
  );

  return (
    <nav className="bg-white px-6 py-4 shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <PiHorseLight className="text-green-900 text-4xl" />
          <div className="flex flex-col leading-tight font-Lena">
            <div className="flex text-2xl font-bold">
              <p className="hover:text-yellow-500 transition">MMSU</p>
              <p className="text-green-800">merch</p>
            </div>
            {user.isAuthenticated && user.role === "private" && (
              <p className="absolute top-10 mt-1 text-xs text-black font-normal font-Poppins">
                Hello, <span className="font-semibold">{user.name}</span>! 🎉
              </p>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-12 font-Poppins text-sm">
          {userRole !== "admin" &&
            nav.map(
              (r, i) =>
                r.isMenu &&
                r.role.includes(userRole) && <MenuItem key={i} r={r} />
            )}
          {userRole === "admin" && (
            <MenuItem r={{ name: "Dashboard", path: "/admin/dashboard" }} />
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {userRole === "private" && (
            <div className="flex md:hidden gap-4">
              <IconButton icon={BsPerson} to="/user" tooltip="View Profile" />
              <IconButton icon={GoHeart} to="/favorites" tooltip="Favorites" />
              <IconButton icon={GiShoppingCart} to="/cart" tooltip="Cart" />
            </div>
          )}

          {user.isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-green-800 hover:text-red-600 text-sm font-semibold font-Poppins hidden md:block"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-green-800 hover:text-green-600 text-sm font-semibold  font-Poppins"
            >
              Log in
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Overlay & Slide Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 right-0 w-3/4 h-full bg-white shadow-md rounded-l-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Exit Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-green-100 transition"
                aria-label="Close Menu"
              >
                <FaTimes className="w-5 h-5 text-green-800" />
              </button>

              <ul className="space-y-2 font-Poppins text-sm px-4 py-4 gap-3">
                {userRole !== "admin" &&
                  nav.map(
                    (r, i) =>
                      r.isMenu &&
                      r.role.includes(userRole) && (
                        <li key={i}>
                          <Link
                            to={r.path}
                            className="block py-2 rounded hover:bg-green-50"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {r.name}
                          </Link>
                        </li>
                      )
                  )}
                {userRole === "admin" && (
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block py-2 rounded hover:bg-green-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                {user.isAuthenticated && (
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-red-600"
                    >
                      Log out
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
