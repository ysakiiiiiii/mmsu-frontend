// components/RenderMenu.jsx
import { useState, useContext } from "react";
import { PiHorseLight } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";
import { AuthContext } from "../../../auth/AuthWrapper";
import { useNavigate, Link } from "react-router-dom";
import IconButton from "./IconButtons";
import MenuItem from "./MenuItem";
import MobileMenu from "./MobileMenu";
import { nav } from "./navigation";
import { AnimatePresence } from "framer-motion";

export const RenderMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRole = user.isAuthenticated ? user.role : "guest";
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (userRole === "admin") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white px-6 py-4 shadow-sm sticky top-0 z-[9999]">
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

        {/* Desktop Menu Render Links*/}
        <ul className="hidden md:flex gap-12 font-Poppins text-sm">
          {userRole !== "admin" &&
            nav.map(
              (r, i) =>
                r.isMenu &&
                r.role.includes(userRole) && <MenuItem key={i} r={r} />
            )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {userRole === "private" && (
            <div className="flex gap-4">
              <IconButton icon={BsPerson} to="/user" tooltip="View Profile" />
              <IconButton icon={GoHeart} to="/favorites" tooltip="Favorites" />
              <IconButton icon={GiShoppingCart} to="/cart" tooltip="Cart" />
            </div>
          )}

          {user.isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="text-green-800 hover:text-red-600 text-sm font-semibold font-Poppins hidden md:block"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-green-800 hover:text-green-600 text-sm font-semibold font-Poppins"
            >
              Log in
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            type="button"
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        closeMenu={() => setMobileMenuOpen(false)}
        nav={nav}
        userRole={userRole}
        user={user}
        handleLogout={handleLogout}
      />
    </nav>
  );
};
