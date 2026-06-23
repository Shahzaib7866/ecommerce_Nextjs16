'use client'

import React, { useState } from 'react';
import all_product from '../Constants/all_product.js';
import { ShopContext } from './ShopContextValue'

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // 🆕 CART DRAWER STATE
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addtoCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[key] > 1) {
        updated[key] -= 1;
      } else {
        delete updated[key];
      }
      return updated;
    });
  };

  const removeItemFromCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        const itemId = Number(key.split('_')[0]);
        const itemInfo = all_product.find((p) => p.id === itemId);
        if (itemInfo) total += itemInfo.new_price * cartItems[key];
      }
    }
    return total;
  };

  const getTotalCartItems = () => {
    let total = 0;
    for (const key in cartItems) {
      total += cartItems[key];
    }
    return total;
  };

  const clearCart = () => {
    setCartItems({});
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addtoCart,
    removeFromCart,
    removeItemFromCart,
    clearCart,

    // 🆕 EXPORTS
    isCartOpen,
    setIsCartOpen,
    openCart,
    closeCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
