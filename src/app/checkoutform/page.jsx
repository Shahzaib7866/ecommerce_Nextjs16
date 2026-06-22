'use client'
import { useState, useContext } from 'react'
import './checkoutform.css'
import { ShopContext } from '../../Context/ShopContextValue'
import { useRouter } from 'next/navigation'  // ← add karo


const CheckoutForm = () => {

    const { getTotalCartAmount, clearCart } = useContext(ShopContext)
    const [paymentMethod, setPaymentMethod] = useState("cod");
  const router = useRouter()  // ← add karo


  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
    clearCart();
    router.push("/"); // Redirect to home page after order placement
  };

    const subtotal = getTotalCartAmount()

  return (
    <div className="checkout-page-container">
      <div className="checkout-layout">
        
        {/* Left Side: Form Details */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          
          {/* Section 1: Contact Information */}
          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="yourname@example.com" required />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+92 3000000000" required />
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="form-section">
            <h2>Shipping Address</h2>
            <div className="input-row">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" placeholder="First name" required />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" placeholder="Last name" required />
              </div>
            </div>
            
            <div className="input-group">
              <label>Address</label>
              <input type="text" placeholder="House, Appartment etc" required />
            </div>

            <div className="input-row matrix">
              <div className="input-group">
                <label>City</label>
                <input type="text" placeholder="city name" required />
              </div>
              <div className="input-group">
                <label>State / Province</label>
                <input type="text" placeholder="state / province" required />
              </div>
              <div className="input-group">
                <label>Postal Code</label>
                <input type="text" placeholder="00000" required />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
        <div className="form-section">
  <h2>Payment Method</h2>
  <div className="payment-options">
    <label className="payment-radio-label">
      <input
        type="radio"
        name="payment"
        checked={paymentMethod === "cod"}
        onChange={() => setPaymentMethod("cod")}
      />
      <span>Cash on Delivery (COD)</span>
    </label>

    <label className="payment-radio-label">
      <input
        type="radio"
        name="payment"
        checked={paymentMethod === "card"}
        onChange={() => setPaymentMethod("card")}
      />
      <span>Credit / Debit Card</span>
    </label>

    {paymentMethod === "card" && (
      <div className="card-details-form">
        <div className="input-group">
          <input type="text" placeholder="Card number" required />
        </div>

        <div className="input-row">
          <div className="input-group">
            <input type="text" placeholder="Expiration date (MM / YY)" required />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Security code" required />
          </div>
        </div>

        <div className="input-group">
          <input type="text" placeholder="Name on card" />
        </div>

        <label className="billing-checkbox">
          <input type="checkbox" defaultChecked required />
          <span>Use shipping address as billing address</span>
        </label>
      </div>
    )}
  </div>
</div>

          <button type="submit" className="place-order-btn">Place Order</button>
        </form>

        {/* Right Side: Visual Order Summary Box */}
   <div className="checkout-summary-panel">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-tag">Free</span>
          </div>
          <hr />
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CheckoutForm