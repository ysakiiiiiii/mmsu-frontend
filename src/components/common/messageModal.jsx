import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiCreditCard,
  FiCheck,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
  FiArrowRightCircle,
} from "react-icons/fi";

const iconMap = {
  cart: <FiShoppingCart size={24} className="text-white" />,
  favorite: <FiHeart size={24} className="text-white" />,
  unfavorite: <FiHeart size={24} className="text-white" />,
  checkout: <FiCreditCard size={24} className="text-white" />,
  login: <FiLogIn size={24} className="text-white" />,
  signup: <FiUserPlus size={24} className="text-white" />,
  logout: <FiLogOut size={24} className="text-white" />,
  redirect: <FiArrowRightCircle size={24} className="text-white" />,
};

const messages = {
  cart: "Added to Cart!",
  favorite: "Added to Favorites!",
  unfavorite: "Removed from Favorites!",
  checkout: "Order Placed Successfully!",
  login: "Login Successful!",
  signup: "Sign-up Successful!",
  logout: "Logged Out!",
  redirect: "Redirecting to Sign In...",
  deleteProduct: "Product Deleted Successfully!",
  updateProduct: "Product Updated Successfully!"
};

const subMessages = {
  cart: "Your item has been added to your cart.",
  favorite: "This item has been saved to your favorites.",
  unfavorite: "This item has been removed from your favorites.",
  checkout: "Thank you for your purchase!",
  login: "Welcome back! You are now logged in.",
  signup: "You can now log in using your credentials.",
  logout: "You have been successfully logged out.",
  redirect: "Please log in to continue.",
  deleteProduct: "The item has been deleted successfully!",
  updateProduct: "The item has been updated successfully!"
};

const MessageModal = ({ isOpen, type, onClose }) => {
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoadingDone(false);
      const timer = setTimeout(() => setLoadingDone(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-1000 bg-black/30 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              {/* Animated Circle */}
              <div className="relative w-20 h-20 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                    fill="none"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="#3b82f6"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  {!loadingDone ? (
                    iconMap[type]
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-green-500 rounded-full p-2"
                    >
                      <FiCheck className="text-white" size={28} />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Message */}
              {loadingDone && (
                <>
                  <h3 className="text-xl font-semibold mb-2">
                    {messages[type]}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {subMessages[type]}
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-green-800 text-white rounded hover:bg-yellow-500 transition"
                  >
                    OK
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;
