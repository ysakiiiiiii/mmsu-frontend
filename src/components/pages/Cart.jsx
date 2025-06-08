import React, { useState } from "react";
import ProtectedRouting from "../../auth/ProtectedRouting";
import { useAuth } from "../../auth/AuthWrapper";
import { useStore } from "../../context/StoreContext";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import CheckoutModal from "../common/checkOutModal";

const CartItem = ({ item, updateCartItemQuantity, removeFromCart }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    if (val > 99) {
      val = 99;
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } else {
      setShowTooltip(false);
    }
    if (val < 1) val = 1;
    updateCartItemQuantity(item.product_id, val);
  };

  return (
    <div className="flex items-center py-4 relative mb-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-md">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-contain mr-4 ml-2"
      />
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">{item.price}</p>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() =>
            updateCartItemQuantity(item.product_id, item.quantity - 1)
          }
          className="p-2 text-gray-500 hover:text-blue-500"
        >
          <FiMinus />
        </button>
        <input
          type="number"
          min="1"
          max="99"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="mx-2 w-16 text-center appearance-none focus:outline-none"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        />

        {showTooltip && (
          <div className="absolute top-0 right-13 bg-red-100 text-red-400 text-sm px-3 py-1 rounded shadow">
            Max quantity is 99
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (item.quantity >= 99) {
              setShowTooltip(true);
              setTimeout(() => setShowTooltip(false), 2000);
              return;
            }
            updateCartItemQuantity(item.product_id, item.quantity + 1);
          }}
          className="p-2 text-gray-500 hover:text-blue-500"
        >
          <FiPlus />
        </button>
      </div>
      <button
        type="button"
        onClick={() => removeFromCart(item.product_id)}
        className="ml-4 p-2 text-gray-500 hover:text-red-500"
      >
        <FiTrash2 className="mr-2" />
      </button>
    </div>
  );
};

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, checkout } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { user } = useAuth();

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("₱", "").replace(",", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };
  const handleCheckoutConfirm = (checkoutData) => {
    checkout(checkoutData);
    setIsCheckoutOpen(false);
  };

  return (
    <ProtectedRouting>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              {cart.map((item) => (
                <CartItem
                  key={item.product_id}
                  item={item}
                  updateCartItemQuantity={updateCartItemQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
            <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₱{calculateTotal()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>₱0.00</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>₱{calculateTotal()}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onCheckout={handleCheckoutConfirm}
          currentUser={user} // Add this line
        />
      </div>
    </ProtectedRouting>
  );
};

export default Cart;
