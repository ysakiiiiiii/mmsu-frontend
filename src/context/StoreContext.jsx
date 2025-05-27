import React, { createContext, useContext, useState, useEffect } from "react";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { useAuth } from "../auth/AuthWrapper"; 

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const { user } = useAuth(); // ✅ Track the current user
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
  });

  const showModal = (type) => {
    console.log("Showing modal:", type);  // <-- Add this line
    setModal({ isOpen: true, type });
    setTimeout(() => {
      setModal({ isOpen: false, type: null });
    }, 3000);
  };

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost/MMSU/mmsu-backend/store/fetchCart.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.cart)) {
        setCart(data.cart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch("http://localhost/MMSU/mmsu-backend/store/fetchFavorites.php", {
        credentials: "include",
      });
      const data = await res.json();
      console.log("fetchFavorites API response:", data);
      if (Array.isArray(data)) {
        setFavorites(data);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();         
      fetchFavorites();     
    } else {
      setCart([]);
      setFavorites([]);
    }
  }, [user]); 

  const addToCart = async (product, quantity = 1) => {
    try {
      await fetch("http://localhost/MMSU/mmsu-backend/store/addToCart.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: product.id, quantity }),
      });
      await fetchCart();
      showModal("cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await fetch("http://localhost/MMSU/mmsu-backend/store/removeCart.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      });
      await fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    try {
      await fetch("http://localhost/MMSU/mmsu-backend/store/updateCartQuantity.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity: newQuantity }),
      });
      await fetchCart();
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const toggleFavorite = async (product) => {
  const productId = product.product_id || product.id;

  if (!productId) {
    console.error("Missing product ID", product);
    return;
  }

  try {
    // First, refresh the favorites list to ensure we have the latest data
    await fetchFavorites();
    
    // Now check against the freshly updated favorites state
    const isFavorited = favorites.some(
      (item) => item.product_id === productId
    );

    console.log("Is favorited?", isFavorited);

    const endpoint = isFavorited ? "removeFavorite.php" : "addFavorites.php";

    const res = await fetch(
      `http://localhost/MMSU/mmsu-backend/store/${endpoint}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      }
    );

    const data = await res.json();
    console.log("toggleFavorite response:", data);

    // Refresh favorites list after toggle to ensure UI is in sync
    await fetchFavorites();

    showModal("favorite");
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
};




  const checkout = () => {
    setCart([]);
    showModal("checkout");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
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
