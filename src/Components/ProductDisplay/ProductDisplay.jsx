'use client'
import React, { useContext, useState } from 'react'
import './productdisplay.css'
import { ShopContext } from '../../context/ShopContextValue'
import { getImageUrl } from '@/src/constants/cloudinary'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductDisplay = (props) => {
    const { product } = props;
    const { addtoCart } = useContext(ShopContext);

    const [selectedSize, setSelectedSize] = useState(null);
    const [sizeError, setSizeError] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeError(true);
            setTimeout(() => setSizeError(false), 700);
            return;
        }
        addtoCart(product.id, selectedSize);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setSizeError(false);
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="thumbnail" />
                    <img src={product.image} alt="thumbnail" />
                    <img src={product.image} alt="thumbnail" />
                    <img src={product.image} alt="thumbnail" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.name}</h1>

                <div className="productdisplay-right-star">
                    <div className="stars-wrapper">
                        <img src={getImageUrl("/star_icon.png")} alt="star" />
                        <img src={getImageUrl("/star_icon.png")} alt="star" />
                        <img src={getImageUrl("/star_icon.png")} alt="star" />
                        <img src={getImageUrl("/star_icon.png")} alt="star" />
                        <img src={getImageUrl("/star_dull_icon.png")} alt="star" />
                    </div>
                    <p>(122 Reviews)</p>
                </div>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>

                <div className="productdisplay-right-description">
                    A lightweight, premium quality knitted pullover shirt, designed tailored for a sleek contours and exceptional all-day breathable comfort.
                </div>

                <div className="productdisplay-right-size">
                    <div className="size-header">
                        <h2>Select Size</h2>
                        {sizeError && (
                            <span className="size-error-msg">⚠ Please select a size</span>
                        )}
                    </div>
                    <div className={`productdisplay-right-sizes-all ${sizeError ? 'size-shake' : ''}`}>
                        {SIZES.map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'active' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className={`add-to-cart-btn ${added ? 'btn-added' : ''}`}
                    onClick={handleAddToCart}
                >
                    {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
                </button>

                <div className="product-meta-info">
                    <p className='productdisplay-right-category'><span>Category:</span> Women, T-shirt, Crop Top</p>
                    <p className='productdisplay-right-category'><span>Tags:</span> Modern, Latest, Trending</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay

