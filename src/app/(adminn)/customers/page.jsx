'use client';
import React, { useState } from 'react';
import './customers.css';
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
  IconButton,
  Chip 
} from '@mui/material';
import { FiEye, FiEdit2, FiUserX, FiSearch, FiTrash2 } from 'react-icons/fi';
import { GoSortDesc } from 'react-icons/go';

// Sample Mock Data (Backend banne ke baad aap yahan API fetch laga sakte hain)
const initialCustomers = [
  {
    _id: 'CUST-984123',
    name: 'Cameron Williamson',
    email: 'cameron@example.com',
    totalSpend: 1240.50,
    phone: '+1 (555) 234-5678',
    joinDate: 'Jan 15, 2025',
    status: 'Active',
    totalOrders: 8
  },
  {
    _id: 'CUST-847291',
    name: 'Esther Howard',
    email: 'esther.h@example.com',
    totalSpend: 450.00,
    phone: '+1 (555) 987-6543',
    joinDate: 'Feb 10, 2025',
    status: 'Inactive',
    totalOrders: 2
  },
  {
    _id: 'CUST-729102',
    name: 'Wade Warren',
    email: 'wade.w@example.com',
    totalSpend: 2890.75,
    phone: '+1 (555) 456-7890',
    joinDate: 'Dec 05, 2024',
    status: 'Active',
    totalOrders: 15
  },
  {
    _id: 'CUST-338192',
    name: 'Bessie Cooper',
    email: 'bessie.c@example.com',
    totalSpend: 0.00,
    phone: '+1 (555) 321-9876',
    joinDate: 'Mar 01, 2026',
    status: 'Banned',
    totalOrders: 0
  }
];

const CustomersPage = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Status Color Mapping for Chips
  const getStatusChip = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Chip label="Active" size="small" className="status-chip active" />;
      case 'inactive':
        return <Chip label="Inactive" size="small" className="status-chip inactive" />;
      case 'banned':
        return <Chip label="Banned" size="small" className="status-chip banned" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  // Delete / Block Handler
  const handleDeleteOrBlock = (id) => {
    if (confirm('Are you sure you want to block or delete this customer?')) {
      setCustomers(customers.filter(cust => cust._id !== id));
    }
  };

  // Filtering Logic
  const filteredCustomers = customers.filter((cust) => {
    const matchesStatus = statusFilter === 'All' || cust.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = cust.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cust.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className='customers-view-page'>
      <div className='page-header-title'>
        <h1>Customer Management</h1>
        <p>View and manage all customers who have purchased items from your store.</p>
      </div>

      <div className='customers-box'>
        {/* Header Filters & Search */}
        <div className='customers-details-header'>
          
          {/* Status Filter Buttons */}
          <div className="customers-filters">
            {['All', 'Active', 'Inactive', 'Banned'].map((status) => (
              <Button 
                key={status}
                variant="text" 
                onClick={() => setStatusFilter(status)}
                className={statusFilter === status ? 'active-filter' : ''}
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Search Box */}
          <div className='customers-header-search'>
            <div className='search-box-wrapper'>
              <FiSearch size={18} className='search-icon' />
              <input 
                type='text' 
                placeholder='Search by name or email...' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='search-input-field'
              />
            </div>
            <GoSortDesc size={20} className='sort-icon' />
          </div>
        </div>

        {/* Customers Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', backgroundColor: 'transparent' }}>
          <TableContainer sx={{ maxHeight: 520 }}>
            <Table stickyHeader aria-label="customers table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 600 }}>Customer Name</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Customer ID</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Phone Number</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Total Spend</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Total Orders</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Join Date</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell style={{ fontWeight: 600 }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">No customers found.</TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        <TableCell style={{ fontWeight: 500, color: '#111827' }}>{row.name}</TableCell>
                        <TableCell className='text-muted'>{row._id}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell style={{ fontWeight: 600, color: '#059669' }}>${row.totalSpend.toFixed(2)}</TableCell>
                        <TableCell align="center">{row.totalOrders}</TableCell>
                        <TableCell>{row.joinDate}</TableCell>
                        <TableCell>{getStatusChip(row.status)}</TableCell>
                        <TableCell align="center">
                          <div className='action-buttons-group'>
                            <IconButton color="primary" size="small" title="View Profile">
                              <FiEye size={16} />
                            </IconButton>
                            <IconButton color="default" size="small" title="Edit / Reset Password" style={{ color: '#4b5563' }}>
                              <FiEdit2 size={16} />
                            </IconButton>
                            <IconButton color="error" size="small" onClick={() => handleDeleteOrBlock(row._id)} title="Suspend / Delete">
                              <FiUserX size={16} />
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
            count={filteredCustomers.length}
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

export default CustomersPage;