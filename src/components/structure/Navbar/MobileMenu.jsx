// components/MobileMenu.jsx
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import MenuItem from "./MenuItem";

const MobileMenu = ({ isOpen, closeMenu, nav, userRole, user, handleLogout }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 z-40 md:hidden"
        onClick={closeMenu}
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
            type="button"
            onClick={closeMenu}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-green-100 transition"
            aria-label="Close Menu"
          >
            <FaTimes className="w-5 h-5 text-green-800" />
          </button>

          <ul className="space-y-2 font-Poppins text-sm px-4 py-4 gap-3">
            {userRole !== "admin" && nav.map((r, i) => r.isMenu && r.role.includes(userRole) && ( <MenuItem key={i} r={r} onClick={closeMenu} />))}
            {user.isAuthenticated && (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
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
);

export default MobileMenu;
