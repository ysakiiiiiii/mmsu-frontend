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
import { useStore } from "../../../context/StoreContext";

export const RenderMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart, favorites } = useStore(); 
  const navigate = useNavigate();
  const userRole = user.isAuthenticated ? user.role : "guest";
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate the total quantity of items in the cart
  const totalCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  if (userRole === "admin") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white px-4 py-3 shadow-sm sticky top-0 z-[9999]">
      <div className="flex justify-between items-center w-full">
        {/* Logo Section - Adjusted for mobile */}
        <div className="flex items-center gap-2">
          <PiHorseLight className="text-green-900 text-2xl sm:text-3xl" />
          <div className="flex flex-col leading-tight font-Lena">
            <div className="flex text-xl sm:text-2xl font-bold">
              <p className="hover:text-yellow-500 transition">MMSU</p>
              <p className="text-green-800">merch</p>
            </div>
            {user.isAuthenticated && user.role === "customer" && (
              <p className="absolute top-9 mt-1 text-xs text-black font-normal font-Poppins">
                Hello, <span className="font-semibold">{user.name}</span>! 🎉
              </p>
            )}
          </div>
        </div>

        {/* Desktop Menu Render Links*/}
        <ul className="hidden md:flex gap-8 font-Poppins text-sm">
          {userRole !== "admin" &&
            nav.map(
              (r, i) =>
                r.isMenu &&
                r.role.includes(userRole) && <MenuItem key={i} r={r} />
            )}
        </ul>

        {/* Right Section - Adjusted icon sizes */}
        <div className="flex items-center gap-3 sm:gap-6">
          {userRole === "customer" && (
            <div className="flex gap-2 sm:gap-4">
              <IconButton
                icon={BsPerson}
                to="/user"
                tooltip="View Profile"
                iconSize="text-lg sm:text-xl"
              />
              {/* Favorites Icon with Quantity Indicator */}
              <div className="relative"> {/* Add a relative container for positioning the badge */}
                <IconButton
                  icon={GoHeart}
                  to="/favorites"
                  tooltip="Favorites"
                  iconSize="text-lg sm:text-xl"
                />
                {favorites.length > 0 && (
                  <span className="text-xs absolute top-5 -right-0.5 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold font-Poppins">
                    {favorites.length > 99 ? "99+" : favorites.length} {/* Display 99+ if count > 99 */}
                  </span>
                )}
              </div>
              {/* Cart Icon with Quantity Indicator */}
              <div className="relative"> {/* Add a relative container for positioning the badge */}
                <IconButton
                  icon={GiShoppingCart}
                  to="/cart"
                  tooltip="Cart"
                  iconSize="text-lg sm:text-xl"
                />
                {totalCartQuantity > 0 && ( 
                  <span className="text-xs absolute top-5 -right-2 bg-red-600 text-white text-[10px] rounded-full h-4 w-6 flex items-center justify-center font-bold font-Poppins">
                    {totalCartQuantity > 99 ? "99+" : totalCartQuantity} {/* Display 99+ if count > 99 */}
                  </span>
                )}
              </div>
            </div>
          )}

          {user.isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="text-green-800 hover:text-red-600 text-xs sm:text-sm font-semibold font-Poppins hidden md:block"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-green-800 hover:text-green-600 text-xs sm:text-sm font-semibold font-Poppins"
            >
              Log in
            </Link>
          )}

          {/* Mobile Toggle - Adjusted size */}
          <button
            type="button"
            className="md:hidden text-xl"
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
