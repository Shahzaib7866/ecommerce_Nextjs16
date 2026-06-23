'use client'

import React, { useContext, useState, useMemo, useEffect } from 'react'
import './shopcategory.css'
import { ShopContext } from '../../Context/ShopContextValue'
import Item from '../Item/Item'
import { getImageUrl } from '@/constants/cloudinary'

const INITIAL_COUNT = 9;
const LOAD_MORE_COUNT = 6;

// Category-specific sort options
const SORT_OPTIONS = {
  men: [
    { label: 'New Arrivals' },
    { label: 'Price: Low to High' },
    { label: 'Price: High to Low' },
    { label: 'Shirts' },
    { label: 'Jeans' },
    { label: 'Accessories' },
  ],
  women: [
    { label: 'New Arrivals' },
    { label: 'Price: Low to High' },
    { label: 'Price: High to Low' },
    { label: 'Dresses' },
    { label: 'Tops' },
    { label: 'Accessories' },
  ],
  kid: [
    { label: 'New Arrivals' },
    { label: 'Price: Low to High' },
    { label: 'Price: High to Low' },
    { label: 'T-Shirts' },
    { label: 'Shorts' },
    { label: 'Accessories' },
  ],
};

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(false);
  const [sortLabel, setSortLabel] = useState('Sort by');


  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
    setSortLabel('Sort by');
  }, [props.category]);

  const sortOptions = SORT_OPTIONS[props.category] || SORT_OPTIONS.men;

  const categoryProducts = useMemo(
    () => all_product.filter((item) => item.category === props.category),
    [all_product, props.category]
  );

  const visibleProducts = categoryProducts.slice(0, visibleCount);
  const hasMore = visibleCount < categoryProducts.length;

  const handleLoadMore = () => {
    const scrollY = window.scrollY;
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
      setLoading(false);
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    }, 200);
  };

  return (
    <div className='shop-category'>

      <img className='shopcategory-banner' src={props.banner} alt={`${props.category} banner`} />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {Math.min(visibleCount, categoryProducts.length)}</span> out of {categoryProducts.length} products
        </p>

        {/* Sort wrapper triggers dropdown on hover */}
        <div className="shopcategory-sort-wrapper">
          <div className="shopcategory-sort">
            {sortLabel}
            <img src={getImageUrl("/dropdown_icon.png")} alt="dropdown" />
          </div>

          <div className="shopcategory-dropdown">
            <div className="shopcategory-dropdown-label">Sort</div>
            {sortOptions.slice(0, 3).map((opt) => (
              <div
                key={opt.label}
                className="shopcategory-dropdown-item"
                onClick={() => setSortLabel(opt.label)}
              >
                {opt.label}
              </div>
            ))}

            <div className="shopcategory-dropdown-divider" />

            <div className="shopcategory-dropdown-label">Category</div>
            {sortOptions.slice(3).map((opt) => (
              <div
                key={opt.label}
                className="shopcategory-dropdown-item"
                onClick={() => setSortLabel(opt.label)}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='shopcategory-products'>
        {visibleProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      <div className="shopcategory-loadmore-wrapper">
        {hasMore ? (
          <div
            className={`shopcategory-loadmore ${loading ? 'loading' : ''}`}
            onClick={!loading ? handleLoadMore : undefined}
          >
            {loading ? <span className="loadmore-spinner" /> : 'Explore More'}
          </div>
        ) : (
          <div className="shopcategory-all-loaded">
            ✓ All {categoryProducts.length} products
          </div>
        )}
      </div>

    </div>
  );
};

export default ShopCategory;