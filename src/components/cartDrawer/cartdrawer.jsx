
'use client'

import React, { useContext } from 'react'
import './cartdrawer.css'
import { ShopContext } from '../../context/ShopContextValue'
import Link from 'next/link'

const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    all_product,
    addtoCart,
    removeFromCart,
    removeItemFromCart,
    getTotalCartAmount
  } = useContext(ShopContext)

  const cartRows = Object.entries(cartItems)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => {
      const [itemId, size] = key.split('_')
      const product = all_product.find((p) => p.id === Number(itemId))
      return product ? { product, size, qty, key } : null
    })
    .filter(Boolean)

  return (
    <>
      {/* Overlay */}
      {isCartOpen && <div className="cart-overlay" onClick={closeCart} />}

      {/* Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>

        <div className="cart-header">
          <h3>Your Cart</h3>
          <button onClick={closeCart}>✕</button>
        </div>

        <div className="cart-body">
          {cartRows.length === 0 && (
            <p className="empty">Cart is empty</p>
          )}

          {cartRows.map(({ product, size, qty, key }) => (
            <div key={key} className="cart-item">

              <img src={product.image} />

              <div className="info">
                <p>{product.name} ({size})</p>
                <p>${product.new_price}</p>

                <div className="qty">
                  <button onClick={() => removeFromCart(product.id, size)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => addtoCart(product.id, size)}>+</button>
                </div>
              </div>

              <button
                className="remove"
                onClick={() => removeItemFromCart(product.id, size)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <h4>Total: ${getTotalCartAmount().toFixed(2)}</h4>

          <Link href="/checkoutform">
            <button
              disabled={cartRows.length === 0}
              className="checkout-btn"
              onClick={closeCart}
            >
              Checkout
            </button>
          </Link>
        </div>

      </div>
    </>
  )
}

export default CartDrawer