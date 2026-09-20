import React from 'react';
import './prodadd.css';
import { FiPlus } from 'react-icons/fi';

const Page = () => {
  return (
    <div className='add-product-page'>  
      {/* Header Section */}
      <div className='add-product-header'>
        <h1>Upload Products</h1>    
        <span className='add-product-span'>Add new products to your store and manage your inventory effectively.</span>
      </div>

      <hr className="my-line" />

      {/* Main Content Area */}
      <div className='add-product-container'>
        <h2 className='section-title'>Basic Information</h2>

        <div className='add-product-form-wrapper'>
          
          {/* Left Form Section */}
          <form className='product-form-fields'>
            <div className='form-group'>
              <label htmlFor='product-name'>Product Name</label>
              <input type='text' id='product-name' className='form-control' placeholder="Enter product name" />
            </div>

            <div className='form-group'>
              <label htmlFor='product-description'>Description</label>
              <textarea id='product-description' className='form-control' placeholder="Write a short description..."></textarea>
            </div>

            {/* Category & Brand Row */}
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='product-category'>Category</label>
                <input type='text' id='product-category' className='form-control' placeholder="e.g. Electronics" />
              </div>

              <div className='form-group'>
                <label htmlFor='product-brand'>Brand</label>
                <input type='text' id='product-brand' className='form-control' placeholder="e.g. Sony" />
              </div>
            </div>

            {/* Prices Row */}
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='product-price'>Regular Price</label>
                <input type='number' id='product-price' className='form-control' placeholder="$0.00" />
              </div>

              <div className='form-group'>
                <label htmlFor='product-discounted-price'>Discounted Price</label>
                <input type='number' id='product-discounted-price' className='form-control' placeholder="$0.00" />
              </div>
            </div>
          </form>

          {/* Right Media & Variant Section */}
          <div className='product-media-sidebar'>
            <div className='product-media'>
              <h3>Product Media</h3>
              <p>Upload images or videos of your product to showcase it effectively.</p>
              <div className='media-upload-box'>
                <input type='file' id='product-media' className='file-input' />
                <label htmlFor='product-media' className='file-label'>
                  <FiPlus size={24} />
                  <span>Choose file or drag here</span>
                </label>
              </div>
            </div>

            {/* Size & Color Attributes */}
            <div className='product-attributes'>
              <h3>Attributes</h3>
              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='product-size'>Size</label>
                  <input type='text' id='product-size' className='form-control' placeholder="e.g. M, L, XL" />
                </div>

                <div className='form-group'>
                  <label htmlFor='product-color'>Color</label>
                  <input type='text' id='product-color' className='form-control' placeholder="e.g. Black" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Page;



