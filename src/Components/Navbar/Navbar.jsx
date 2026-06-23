'use client'

import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { ShopContext } from '../../Context/ShopContextValue'
import { CiSearch } from "react-icons/ci";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getImageUrl } from '../../constants/cloudinary'


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = React.useRef(0);
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();

  const { getTotalCartItems, openCart } = useContext(ShopContext);

  const getActiveMenu = () => {
    if (pathname === '/') return 'shop';
    if (pathname.startsWith('/men')) return 'men';
    if (pathname.startsWith('/women')) return 'women';
    if (pathname.startsWith('/kids')) return 'kids';
    return '';
  };

  const activeMenu = getActiveMenu();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
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
      {/* Logo */}
      <Link href='/' className='nav-logo' onClick={() => setMobileMenuOpen(false)}>
<img src={getImageUrl("logo.png")} alt="Wearit logo" />
        <span>Wearit</span>
      </Link>

      {/* Desktop nav links */}
      <ul className='nav-menu'>
        <li><Link href='/' className={activeMenu === 'shop' ? 'active' : ''}>Shop</Link></li>
        <li><Link href='/men' className={activeMenu === 'men' ? 'active' : ''}>Men</Link></li>
        <li><Link href='/women' className={activeMenu === 'women' ? 'active' : ''}>Women</Link></li>
        <li><Link href='/kids' className={activeMenu === 'kids' ? 'active' : ''}>Kids</Link></li>
      </ul>

      {/* Desktop right actions */}
      <div className='nav-actions desktop-only'>
        <div className="search-wrapper">
          {showSearch && (
            <input type="text" placeholder="Search..." className="search-input"
              autoFocus onBlur={() => setShowSearch(false)} />
          )}
          <CiSearch onClick={() => setShowSearch(!showSearch)} className="search-icon" />
        </div>

<div className='cart-wrapper' onClick={openCart}>

        {/* <Link href='/cart' className='cart-wrapper'> */}
          <img src={getImageUrl("cart_icon.png")} alt="Cart" />
          {getTotalCartItems() > 0 && (
            <span className='cart-badge'>{getTotalCartItems()}</span>
          )}
        {/* </Link> */}
        </div>
      </div>

      {/* Hamburger */}
      <button className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className='mobile-nav-menu'>
          <li><Link href='/' className={activeMenu === 'shop' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Shop</Link></li>
          <li><Link href='/men' className={activeMenu === 'men' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Men</Link></li>
          <li><Link href='/women' className={activeMenu === 'women' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Women</Link></li>
          <li><Link href='/kids' className={activeMenu === 'kids' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Kids</Link></li>
        </ul>
        <div className='mobile-actions'>
          <div className="search-wrapper">
            {showSearch && (
              <input type="text" placeholder="Search..." className="search-input"
                autoFocus onBlur={() => setShowSearch(false)} />
            )}
            <CiSearch onClick={() => setShowSearch(!showSearch)} className="search-icon" />
          </div>
          <Link href='/cart' className='mobile-cart' onClick={() => setMobileMenuOpen(false)}>
             <img src={getImageUrl("cart_icon.png")} alt="Cart" />
            <span>Cart</span>
            {getTotalCartItems() > 0 && (
              <span className='cart-badge'>{getTotalCartItems()}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className='mobile-overlay' onClick={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  )
}

export default Navbar