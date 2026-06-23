import React from 'react'
import './footer.css'
import { getImageUrl } from '@/src/constants/cloudinary'



const Footer = () => {
  return (
    <footer className='footer'>

      {/* Top Section */}
      <div className="footer-top">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={getImageUrl("/logo.png")} alt="Wearit logo" />
            <span>Wearit</span>
          </div>
          <p className="footer-tagline">
            Style that speaks. Fashion for everyone — men, women & kids.
          </p>
          <div className='footer-social-icons'>
            <a href="#" className="footer-icon-box" aria-label="Instagram">
              <img src={getImageUrl("/instagram_icon.png")} alt="Instagram" />
            </a>
            <a href="#" className="footer-icon-box" aria-label="Pinterest">
              <img src={getImageUrl("/pintester_icon.png")} alt="Pinterest" />
            </a>
            <a href="#" className="footer-icon-box" aria-label="WhatsApp">
             <img src={getImageUrl("/whatsapp_icon.png")} alt="WhatsApp" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/kids">Kids</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Info</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Offices</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Track Order</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <hr />
        <div className="footer-bottom-inner">
          <p>© 2026 Wearit. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
