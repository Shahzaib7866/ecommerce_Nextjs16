'use client'
import React, { useContext } from 'react'
import "./Cartitems.css"
import { ShopContext } from '../../Context/ShopContextValue'
import { getImageUrl } from '../../constants/cloudinary'; 

import Link from 'next/link'

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, addtoCart, removeFromCart, removeItemFromCart } = useContext(ShopContext);

    const cartRows = Object.entries(cartItems)
        .filter(([, qty]) => qty > 0)
        .map(([key, qty]) => {
            const [itemId, size] = key.split('_');
            const product = all_product.find((p) => p.id === Number(itemId));
            return product ? { product, size, qty, key } : null;
        })
        .filter(Boolean);

    return (
        <div className='cartitems'>
            <div className="cartitems-container">
                <div className="cartitems-format-mainHeader">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>

                <div className="cartitems-list">
                    {cartRows.length === 0 && (
                        <p className="cart-empty-msg">Your cart is empty.</p>
                    )}
                    {cartRows.map(({ product, size, qty, key }) => (
                        <div key={key} className="cartitems-row-wrapper">
                            <div className='cartitems-format cartitems-format-main'>
                                <div className="product-img-container">
                                    <img src={product.image} alt={product.name} className='carticon-product-icon' />
                                </div>

                                <p className="product-name">
                                    {product.name}
                                    <span className="cart-size-badge">{size}</span>
                                </p>

                                <p className="product-price">${product.new_price}</p>

                                <div className="cart-qty-control">
                                    <button onClick={() => removeFromCart(product.id, size)}>−</button>
                                    <span className='cartitems-quantity'>{qty}</span>
                                    <button onClick={() => addtoCart(product.id, size)}>+</button>
                                </div>

                                <p className="product-total-price">${(product.new_price * qty).toFixed(2)}</p>

                                <div className="remove-icon-container">
                                    <img
                                        className='cartitems-remove-icon'
                                        src={getImageUrl("/cart_cross_icon.png")}
                                        onClick={() => removeItemFromCart(product.id, size)}
                                        alt="Remove"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div className="total-box">
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount().toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p className="free-shipping">Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item final-total">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount().toFixed(2)}</h3>
                        </div>
                    </div>
                  {cartRows.length === 0 ? (
    <button
        className="checkout-btn"
        disabled
        style={{
            opacity: 0.5,
            cursor: "not-allowed"
        }}
    >
        Proceed to Checkout
    </button>
) : (
    <Link href='/checkoutform'>
        <button className="checkout-btn">
            Proceed to Checkout
        </button>
    </Link>
)}
                </div>

                <div className="cartitems-promocode">
                    <p>If you have a Promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="Promo code" />
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems