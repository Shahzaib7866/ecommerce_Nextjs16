'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import './prodadd.css';
import { FiPlus, FiTrash2, FiVideo, FiX } from 'react-icons/fi';

const AddProductContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('id'); // URL se ID nikal li

  // 1. Text Inputs ke liye State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    stock: '',
    price: '',
    discountedPrice: '',
    size: '',
    color: ''
  });

  // 2. Media Files, Error, Loading aur Preview Modal states
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  
  // Preview Pop-up state
  const [previewData, setPreviewData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Agar URL mein ID hai, toh product ka data fetch karke fields mein fill karna
  useEffect(() => {
    if (productId) {
      const fetchProductDetails = async () => {
        setFetching(true);
        try {
          const response = await fetch(`http://localhost:8000/api/products/${productId}`);
          const data = await response.json();
          if (response.ok) {
            setFormData({
              title: data.title || '',
              description: data.description || '',
              category: data.category || '',
              stock: data.stock || '',
              price: data.price || '',
              discountedPrice: data.discountedPrice || '',
              size: data.size || '',
              color: data.color || ''
            });
            // Agar pehle se images hain toh unhe handle kar sakte hain
          } else {
            alert('Failed to fetch product details.');
          }
        } catch (error) {
          console.error('Error fetching product for edit:', error);
        } finally {
          setFetching(false);
        }
      };

      fetchProductDetails();
    }
  }, [productId]);

  // Text inputs handle karne ka common function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // File selection handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setErrorMessage('');

    if (selectedFiles.length + files.length > 5) {
      setErrorMessage('You can upload a maximum of 4 images and 1 video.');
      return;
    }

    files.forEach(file => {
      if (file.type.startsWith('video/')) {
        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        videoElement.onloadedmetadata = function() {
          window.URL.revokeObjectURL(videoElement.src);
          if (videoElement.duration > 10.5) {
            setErrorMessage('Video must not be more than 10 seconds long.');
          }
        }
        videoElement.src = URL.createObjectURL(file);
      }
    });

    setSelectedFiles(prev => [...prev, ...files]);
  };

  // Remove individual file from preview list
  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 3. Form Submit & Database Saving / Updating Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = new FormData();

      // Saare text fields append karna
      Object.keys(formData).forEach(key => {
        dataToSend.append(key, formData[key]);
      });

      // Saari files append karna
      selectedFiles.forEach((file) => {
        dataToSend.append('mediaFiles', file);
      });

      // URL mein ID hone par PUT (Update), warna POST (Create) request
      const url = productId 
        ? `http://localhost:8000/api/products/${productId}` 
        : 'http://localhost:8000/api/products';
      
      const method = productId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: dataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setPreviewData({
          ...formData,
          files: selectedFiles.map(file => URL.createObjectURL(file))
        });
        
        setIsModalOpen(true);

        if (!productId) {
          setFormData({
            title: '',
            description: '',
            category: '',
            stock: '',
            price: '',
            discountedPrice: '',
            size: '',
            color: ''
          });
          setSelectedFiles([]);
        }

      } else {
        alert(result.message || 'Something went wrong!');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading product details for editing...</div>;
  }

  return (
    <div className='add-product-page'>  
      {/* Header Section */}
      <div className='add-product-header'>
        <h1>{productId ? 'Edit Product' : 'Upload Products'}</h1>    
        <span className='add-product-span'>
          {productId ? 'Update your product information below.' : 'Add new products to your store and manage your inventory effectively.'}
        </span>
      </div>

      <hr className="my-line" />

      {/* Main Content Area */}
      <div className='add-product-container'>
        <h2 className='section-title'>Basic Information</h2>

        <form onSubmit={handleSubmit} className='add-product-form-wrapper'>
          
          {/* Left Form Section */}
          <div className='product-form-fields'>
            <div className='form-group'>
              <label htmlFor='product-name'>Product Title</label>
              <input 
                type='text' 
                name='title' 
                id='product-name' 
                className='form-control' 
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='product-description'>Description</label>
              <textarea 
                name='description' 
                id='product-description' 
                className='form-control' 
                placeholder="Write a short description..."
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Category & Stock Row */}
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='product-category'>Category</label>
                <input 
                  type='text' 
                  name='category' 
                  id='product-category' 
                  className='form-control' 
                  placeholder="Men, Women, Kids, etc."
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='product-stock'>Stock</label>
                <input 
                  type='number' 
                  name='stock' 
                  id='product-stock' 
                  className='form-control' 
                  placeholder="e.g. 10"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Prices Row */}
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='product-price'>Regular Price</label>
                <input 
                  type='number' 
                  name='price' 
                  id='product-price' 
                  className='form-control' 
                  placeholder="0.00Rs"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='product-discounted-price'>Discounted Price</label>
                <input 
                  type='number' 
                  name='discountedPrice' 
                  id='product-discounted-price' 
                  className='form-control' 
                  placeholder="0.00Rs"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button 
              type='submit' 
              className='preview-submit-btn'
              disabled={loading}
            >
              {loading ? 'Saving...' : (productId ? 'Update Product' : 'Submit for Preview')}
            </button>
          </div>

          {/* Right Media & Variant Section */}
          <div className='product-media-sidebar'>
            <div className='product-media'>
              <h3>Product Media</h3>
              <p>Upload up to 4 images (Required) & 1 video max 10s (Optional).</p>
              
              <div className='media-upload-box'>
                <input 
                  type='file' 
                  id='product-media' 
                  className='file-input' 
                  multiple 
                  accept='image/*,video/*'
                  onChange={handleFileChange}
                />
                <label htmlFor='product-media' className='file-label'>
                  <FiPlus size={24} />
                  <span>Choose files or drag here</span>
                </label>
              </div>

              {errorMessage && <p className='error-text'>{errorMessage}</p>}

              <div className='media-preview-container'>
                {selectedFiles.map((file, index) => (
                  <div className='media-preview-box' key={index}>
                    {file.type.startsWith('video/') ? (
                      <div className='preview-badge video-badge'>
                        <FiVideo size={14} /> Video ({index + 1})
                      </div>
                    ) : (
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt="preview" 
                        className='preview-thumb'
                      />
                    )}
                    <button 
                      type='button' 
                      className='remove-btn' 
                      onClick={() => handleRemoveFile(index)}
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Size & Color Attributes */}
            <div className='product-attributes'>
              <h3>Attributes</h3>
              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='product-size'>Size</label>
                  <input 
                    type='text' 
                    name='size'
                    id='product-size' 
                    className='form-control' 
                    placeholder="e.g. M, L, XL"
                    value={formData.size}
                    onChange={handleInputChange}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='product-color'>Color</label>
                  <input 
                    type='text' 
                    name='color'
                    id='product-color' 
                    className='form-control' 
                    placeholder="e.g. Black"
                    value={formData.color}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>

      {/* Pop-up Modal Card for Preview */}
      {isModalOpen && previewData && (
        <div className='modal-overlay'>
          <div className='modal-card'>
            <div className='modal-header'>
              <h3>{productId ? 'Product Updated Successfully!' : 'Product Preview Card'}</h3>
              <button className='modal-close-btn' onClick={() => { setIsModalOpen(false); if(productId) router.push('/products/view'); }}>
                <FiX size={20} />
              </button>
            </div>
            
            <div className='modal-body'>
              <p className='success-alert'>✔ Changes successfully saved to database!</p>
              
              <div className='preview-info'>
                <p><strong>Title:</strong> {previewData.title}</p>
                <p><strong>Description:</strong> {previewData.description || 'N/A'}</p>
                <p><strong>Category:</strong> {previewData.category}</p>
                <p><strong>Stock:</strong> {previewData.stock || '0'}</p>
                <p><strong>Price:</strong> ${previewData.price}</p>
                <p><strong>Discounted Price:</strong> ${previewData.discountedPrice || '0'}</p>
                <p><strong>Size:</strong> {previewData.size || 'N/A'}</p>
                <p><strong>Color:</strong> {previewData.color || 'N/A'}</p>
              </div>
            </div>

            <div className='modal-footer'>
              <button className='modal-action-btn' onClick={() => { setIsModalOpen(false); if(productId) router.push('/products/view'); }}>
                {productId ? 'Back to Inventory' : 'Add Another Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddProductContent />
    </Suspense>
  );
};

export default Page;