import React, { createContext, useContext, useState } from 'react';
import ConfirmationModal from '../components/common/ConfirmationModal';

const StoreContext = createContext();

// Create a custom hook for using the store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
  });

  const showModal = (type) => {
    setModal({ isOpen: true, type });
    setTimeout(() => {
      setModal({ isOpen: false, type: null });
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showModal('cart');
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // If quantity would be less than 1, remove the item instead
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(item => item.id === product.id);
      if (isFavorite) {
        return prevFavorites.filter(item => item.id !== product.id);
      }
      showModal('favorite');
      return [...prevFavorites, product];
    });
  };

  const checkout = () => {
    setCart([]);
    showModal('checkout');
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart, // Now included
        updateCartItemQuantity, // Now included
        toggleFavorite,
        checkout,
        modal,
        setModal,
      }}
    >
      {children}
      <ConfirmationModal 
        isOpen={modal.isOpen} 
        type={modal.type} 
        onClose={() => setModal({ isOpen: false, type: null })}
      />
    </StoreContext.Provider>
  );
};