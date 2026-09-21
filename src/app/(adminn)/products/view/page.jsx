'use client';
import React, { useState, useEffect } from 'react';
import './view.css';
import { 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination,
  IconButton 
} from '@mui/material';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import { GoSortDesc } from 'react-icons/go';

const ProductsViewPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Backend se products fetch karne ke liye (Real-time sync)
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product Handler
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProducts(products.filter(item => item._id !== id));
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filtering aur Searching Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory = filterCategory === 'All' || 
      (product.category && product.category.toLowerCase() === filterCategory.toLowerCase());
    
    const matchesSearch = product.title && 
      product.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className='products-view-page'>
      <div className='page-header-title'>
        <h1>Product Inventory</h1>
        <p>Manage and view all your store items here.</p>
      </div>

      <div className='products-box'>
        <div className='products-details'>
          
          {/* Category Filters */}
          <div className="products-filters">
            {['All', 'Men', 'Women', 'Kids'].map((cat) => (
              <Button 
                key={cat}
                variant="text" 
                onClick={() => setFilterCategory(cat)}
                className={filterCategory === cat ? 'active-filter' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Search Box & Sort */}
          <div className='products-header-search'>
            <div className='search-box-wrapper'>
              <FiSearch size={18} className='search-icon' />
              <input 
                type='text' 
                placeholder='Search by product name...' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='search-input-field'
              />
            </div>
            <GoSortDesc size={20} className='sort-icon' />
          </div>
        </div>

        {/* Products Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', backgroundColor: 'transparent' }}>
          <TableContainer sx={{ maxHeight: 480 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 600 }}>Product Name</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Product ID</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Image</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Price</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Stock</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Category</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Sizes</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Base SKU</TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">Loading products...</TableCell>
                  </TableRow>
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">No products found.</TableCell>
                  </TableRow>
                ) : (
                  filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        <TableCell>{row.title || 'N/A'}</TableCell>
                        <TableCell className='text-muted'>{row._id.slice(-6)}</TableCell>
                        <TableCell>
                          {row.images && row.images.length > 0 ? (
                            <img src={row.images[0]} alt={row.title} className='table-product-thumb' />
                          ) : (
                            <span className='no-img'>No Image</span>
                          )}
                        </TableCell>
                        <TableCell>${row.price}</TableCell>
                        <TableCell>{row.stock || 0}</TableCell>
                        <TableCell>{row.category || 'N/A'}</TableCell>
                        <TableCell>{row.size || '-'}</TableCell>
                        <TableCell>{row.sku || '-'}</TableCell>
                        <TableCell align="center">
                          <div className='action-buttons-group'>
                            <IconButton color="primary" size="small" title="Edit">
                              <FiEdit size={16} />
                            </IconButton>
                            <IconButton color="error" size="small" onClick={() => handleDelete(row._id)} title="Delete">
                              <FiTrash2 size={16} />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default ProductsViewPage;