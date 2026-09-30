'use client'

import React, { useContext, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { CiSearch } from 'react-icons/ci'
import { GoPerson } from "react-icons/go";
import { ShopContext } from '../../context/ShopContextValue'
import { getImageUrl } from '@/constants/cloudinary'
import './Navbar.css'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const { getTotalCartItems, wishlist, openCart } = useContext(ShopContext);

  const getActiveMenu = () => {
    if (pathname === '/') return 'new-arrivals';
    if (pathname.startsWith('/collections')) return 'collections';
    if (pathname.startsWith('/atelier')) return 'atelier';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/contact')) return 'contact';
    return '';
  };

  const activeMenu = getActiveMenu();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 15);
      if (currentY < lastScrollY.current || currentY < 60) {
        setVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 60) {
        setVisible(false);
        setMobileMenuOpen(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${visible ? 'nav-visible' : 'nav-hidden'}`}>
      
      {/* Brand Logo */}
      <Link href='/' className='nav-logo' onClick={() => setMobileMenuOpen(false)}>
        <Image 
          src={getImageUrl("logo.png")} 
          alt="WEARIT logo" 
          width={38} 
          height={38} 
          priority
        />
        <div className="logo-text-group">
          <span className="logo-title font-serif">WEARIT</span>
          <span className="logo-badge">ATELIER</span>
        </div>
      </Link>

      {/* Desktop Nav Links */}
      <ul className='nav-menu'>
        <li><Link href='/' className={activeMenu === 'new-arrivals' ? 'active' : ''}>New Arrivals</Link></li>
        <li><Link href='/women' className={activeMenu === 'collections' ? 'active' : ''}>Women</Link></li>
        <li><Link href='/men' className={activeMenu === 'atelier' ? 'active' : ''}>Men</Link></li>
        <li><Link href='/kids' className={activeMenu === 'about' ? 'active' : ''}>Kids</Link></li>
        <li><Link href='/contact' className={activeMenu === 'contact' ? 'active' : ''}>Contact Us</Link></li>
      </ul>

      {/* Desktop Right Actions */}
      <div className='nav-actions desktop-only'>
        <div className={`search-wrapper ${showSearch ? 'open' : ''}`}>
          <CiSearch onClick={() => setShowSearch(!showSearch)} className="search-icon" title="Search" />
          {showSearch && (
            <input 
              type="text" 
              placeholder="Search luxury wear..." 
              className="search-input"
              autoFocus 
              onBlur={() => setShowSearch(false)} 
            />
          )}
        </div>

        {/* Wishlist Button */}
        <div className="icon-circle-btn" title="profile">
          <GoPerson />
          {/* <i className="ri-heart-3-line"></i> */}
          {wishlist?.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
        </div>

        {/* Cart Bag Trigger */}
        <div className='cart-wrapper' onClick={openCart} title="Bag">
          <i className="ri-shopping-bag-3-line cart-icon-ri"></i>
          {getTotalCartItems() > 0 && (
            <span className="cart-badge-count">{getTotalCartItems()}</span>
          )}
        </div>
      </div>

      {/* Mobile Hamburger Toggle */}
      <button 
        className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className='mobile-nav-menu'>
          <li><Link href='/' className={activeMenu === 'new-arrivals' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link></li>
          <li><Link href='/collections' className={activeMenu === 'collections' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Collections</Link></li>
          <li><Link href='/atelier' className={activeMenu === 'atelier' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>The Atelier</Link></li>
          <li><Link href='/about' className={activeMenu === 'about' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>About</Link></li>
          <li><Link href='/contact' className={activeMenu === 'contact' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
        </ul>

        <div className='mobile-actions'>
          <div className="search-wrapper">
            <CiSearch onClick={() => setShowSearch(!showSearch)} className="search-icon" />
            {showSearch && (
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input"
                autoFocus 
                onBlur={() => setShowSearch(false)} 
              />
            )}
          </div>

          <div className='mobile-cart' onClick={() => { setMobileMenuOpen(false); openCart(); }}>
            <i className="ri-shopping-bag-3-line"></i>
            <span>Bag</span>
            {getTotalCartItems() > 0 && (
              <span className='cart-badge'>{getTotalCartItems()}</span>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div className='mobile-overlay' onClick={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  )
}

export default Navbar