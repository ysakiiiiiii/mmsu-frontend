import React from 'react';
import ProtectedRouting from '../../auth/ProtectedRouting';
import { useStore } from '../../context/StoreContext'; 
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, checkout } = useStore();

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₱', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
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
              {cart.map(item => (
                <div key={item.product_id} className="flex items-center border-b py-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-contain mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => updateCartItemQuantity(item.product_id, item.quantity - 1)}
                      className="p-2 text-gray-500 hover:text-blue-500"
                    >
                      <FiMinus />
                    </button>
                    <span className="mx-2 w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartItemQuantity(item.product_id, item.quantity + 1)}
                      className="p-2 text-gray-500 hover:text-blue-500"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product_id)}
                    className="ml-4 p-2 text-gray-500 hover:text-red-500"
                  >
                    <FiTrash2 />
                  </button>
                </div>
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
                onClick={checkout}
                className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRouting>
  );
};

export default Cart;
