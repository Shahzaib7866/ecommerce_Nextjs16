
'use client'

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ShopContext } from './ShopContextValue.js';

// localStorage keys: cart aur wishlist ko browser mein in naamon se save karte hain
const CART_KEY = 'wearit_cart';
const WISHLIST_KEY = 'wearit_wishlist';

// Cart 7 din baad expire ho jata hai (purana cart user ko na dikhe)
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

// Backend ka base URL, .env.local se aata hai (e.g. http://localhost:8000/api)
// NEXT_PUBLIC_ prefix zaroori hai warna browser mein undefined milega
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// =====================================================================
// HELPERS (component ke bahar, taake har render pe dobara na banein)
// =====================================================================

// Price ko "Rs. 1,500" format mein dikhane ke liye. Export hai taake
// dusri files bhi direct import kar sakein.
export const formatPKR = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`;

// localStorage se cart parhta hai. Agar 7 din se purana ya kharab data ho
// to saaf kar ke empty cart deta hai.
// typeof window check: Next.js server pe render hota hai jahan localStorage nahi hota.
const loadCartFromStorage = () => {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return {};
  try {
    const { items, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > EXPIRY_MS) {
      localStorage.removeItem(CART_KEY);
      return {};
    }
    return items || {};
  } catch {
    // JSON kharab ho gaya to crash ke bajaye reset kar do
    localStorage.removeItem(CART_KEY);
    return {};
  }
};

// localStorage se wishlist (product ids ka array) parhta hai
const loadWishlistFromStorage = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// =====================================================================
// PROVIDER
// =====================================================================

const ShopContextProvider = (props) => {
  // ---------------------------- STATE ----------------------------

  // DB se aaye hue products. Shuru mein empty array, fetch ke baad bharta hai.
  const [all_product, setAllProduct] = useState([]);
  // true jab tak products aa rahe hain (pages par "Loading..." dikhane ke liye)
  const [productsLoading, setProductsLoading] = useState(true);
  // fetch fail ho to error message yahan aata hai
  const [productsError, setProductsError] = useState(null);

  // Cart ka shape: { "productId_size": quantity }, e.g. { "64ab.._M": 2 }
  const [cartItems, setCartItems] = useState({});
  // Wishlist mein sirf product ids hote hain
  const [wishlist, setWishlist] = useState([]);
  // true jab localStorage se cart/wishlist load ho chuki ho.
  // Iske bagair save wala effect pehle hi empty data se localStorage overwrite kar deta.
  const [hydrated, setHydrated] = useState(false);
  // Cart drawer khula hai ya band
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Coupon se mila hua discount percentage
  const [discountPercent, setDiscountPercent] = useState(0);

  // Cart drawer kholne/band karne ke shortcuts
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // ------------------- PRODUCTS FETCH (AXIOS) -------------------

  // Backend se saare products laata hai. useCallback isliye ke function ka
  // reference stable rahe (effect mein dependency ki wajah se loop na bane)
  // aur refetchProducts ke taur par bhi bahar diya ja sake.
  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      setProductsError(null);

      const { data } = await axios.get(`${API_URL}/products`);

      // Backend kabhi seedha array bhejta hai, kabhi { products: [...] }.
      // Dono cases handle ho jate hain.
      const list = Array.isArray(data) ? data : data.products || [];

      // MongoDB ka field _id hota hai, lekin baaqi components (Item, cart,
      // product page) p.id use karte hain. Isliye id bana di, baaqi code nahi tootay.
  const normalized = list.map((p) => {
  // images array ka pehla element. Agar string hai to wahi, agar object hai to uska url
  const first = p.images?.[0];
  const firstImage = typeof first === 'string' ? first : first?.url || '';

  return {
    ...p,
    id: p._id,
    name: p.title,
    image: firstImage,
    new_price: p.price,
    old_price: p.oldPrice || null, // DB mein abhi nahi hai
  };
});

      setAllProduct(normalized);
    } catch (err) {
      console.error(err);
      setProductsError('Products load nahi ho sakay');
    } finally {
      // Success ho ya fail, loading khatam
      setProductsLoading(false);
    }
  }, []);

  // App load hote hi ek dafa products fetch karo
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ------------- CART / WISHLIST: LOAD + SAVE (localStorage) -------------

  // Mount pe (sirf browser mein) saved cart aur wishlist wapas lao.
  // Ye effect mein isliye hai ke server aur client ka pehla render same rahe
  // (warna Next.js hydration mismatch error deta hai).
  useEffect(() => {
    setCartItems(loadCartFromStorage());
    setWishlist(loadWishlistFromStorage());
    setHydrated(true);
  }, []);

  // Cart badalte hi localStorage mein save karo.
  // hydrated check: load hone se pehle save nahi karna warna purana cart mit jata.
  // Empty cart ho to key hi hata do, taake faltu data na pada rahe.
  useEffect(() => {
    if (!hydrated) return;
    if (Object.keys(cartItems).length === 0) {
      localStorage.removeItem(CART_KEY);
      return;
    }
    localStorage.setItem(
      CART_KEY,
      JSON.stringify({ items: cartItems, savedAt: Date.now() })
    );
  }, [cartItems, hydrated]);

  // Wishlist badalte hi save karo (same hydrated logic)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  // ---------------------------- CART ACTIONS ----------------------------

  // Item cart mein add karo. Key = "id_size", isliye ek hi product ke
  // alag sizes alag lines banate hain. Pehle se ho to quantity +1.
  const addtoCart = (itemId, size = 'M') => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  // Quantity 1 kam karo; agar 1 hi thi to poori line hata do
  const removeFromCart = (itemId, size = 'M') => {
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

  // Quantity chahe jitni ho, poori line cart se hata do (delete/trash button)
  const removeItemFromCart = (itemId, size = 'M') => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  // Cart bilkul khali karo (state + localStorage), e.g. order place hone ke baad
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem(CART_KEY);
  };

  // ---------------------------- WISHLIST ----------------------------

  // Id wishlist mein hai to nikal do, nahi hai to daal do
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // ---------------------------- TOTALS ----------------------------

  // Cart ka subtotal: har key se product id nikalo, all_product mein dhoondo,
  // price x quantity jama karo. Number() nahi lagaya kyunke Mongo id string hai
  // (Number se NaN aata aur total 0 hota). Dono taraf String() se compare hota hai.
  const getTotalCartAmount = () => {
    let total = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        const itemId = key.split('_')[0];
        const itemInfo = all_product.find((p) => String(p.id) === itemId);
        if (itemInfo) {
          const itemPrice = itemInfo.new_price || itemInfo.price || 0;
          total += itemPrice * cartItems[key];
        }
      }
    }
    return total;
  };

  // Subtotal minus coupon discount. Math.max se total kabhi negative nahi hoga.
  const getDiscountedCartAmount = () => {
    const subtotal = getTotalCartAmount();
    const discount = (subtotal * discountPercent) / 100;
    return Math.max(0, subtotal - discount);
  };

  // Cart icon ke badge ke liye: saari quantities ka jama
  const getTotalCartItems = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  // ---------------------------- COUPON ----------------------------

  // Coupon code check karta hai. Trim + uppercase se "wearit15 " bhi chal jata hai.
  // { success, message } wapas deta hai taake UI message dikha sake.
  const applyCoupon = (code) => {
    if (code?.trim()?.toUpperCase() === 'WEARIT15') {
      setDiscountPercent(15);
      return { success: true, message: '15% Atelier VIP Discount Applied!' };
    }
    return { success: false, message: 'Invalid Coupon Code. Try "WEARIT15".' };
  };

  // ---------------------------- CONTEXT VALUE ----------------------------

  // Jo kuch components ko chahiye woh yahan expose hota hai (useContext se milta hai)
  const contextValue = {
    // products
    all_product,
    productsLoading,
    productsError,
    refetchProducts: fetchProducts,
    // cart
    cartItems,
    addtoCart,
    removeFromCart,
    removeItemFromCart,
    clearCart,
    getTotalCartItems,
    getTotalCartAmount,
    getDiscountedCartAmount,
    // coupon
    discountPercent,
    applyCoupon,
    // wishlist
    wishlist,
    toggleWishlist,
    // UI
    formatPKR,
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
