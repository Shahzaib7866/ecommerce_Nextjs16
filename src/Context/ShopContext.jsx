
// export default ShopContextProvider;
'use client'  // ← sabse upar

import React, { useState } from 'react';
import all_product from '../Constants/all_product.js';
import { ShopContext } from './ShopContextValue'

const ShopContextProvider = (props) => {
  // cartItems: { "itemId_SIZE": count }  e.g. { "3_M": 2, "5_XL": 1 }
  const [cartItems, setCartItems] = useState({});

  // Add item with size
  const addtoCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  // Remove one quantity
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

  // Remove entire row
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
  setCartItems({})
}

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addtoCart,
    removeFromCart,
    removeItemFromCart,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;






