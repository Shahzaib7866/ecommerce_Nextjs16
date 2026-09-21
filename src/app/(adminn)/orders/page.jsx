

"use client";

import React, { useState, useContext } from 'react';
import { Button } from '@mui/material';
import { LuRefreshCcw, LuCircleDollarSign, LuRotateCcw, LuClock, LuUsers } from "react-icons/lu";
import { CiWavePulse1 } from "react-icons/ci";
import './orders.css';
import { GoSortDesc } from "react-icons/go";
import SearchBox from '@/components/admin/SearchBox';
import { ThemeContext } from '@/context/ThemeContext';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'orderId', label: 'ORDER ID', minWidth: 120 },
  { id: 'customer', label: 'CUSTOMERS', minWidth: 150 },
  { id: 'items', label: 'ITEMS', minWidth: 80, align: 'right' },
  { id: 'price', label: 'PRICE', minWidth: 100, align: 'right' },
  { id: 'status', label: 'STATUS', minWidth: 110, align: 'center' },
];

function createData(orderId, customer, items, price, status) {
  return { orderId, customer, items, price, status };
}

const initialRows = [
  createData('#ORD-1001', 'Ahmad Ali', 3, 'PKR 1,200', 'Unpaid'),
  createData('#ORD-1002', 'Sara Khan', 1, 'PKR 450', 'Unfulfilled'),
  createData('#ORD-1003', 'Usman Akram', 5, 'PKR 3,100', 'Paid'),
  createData('#ORD-1004', 'Ayesha Malik', 2, 'PKR 890', 'Unfulfilled'),
  createData('#ORD-1005', 'Bilal Ahmed', 4, 'PKR 2,150', 'Paid'),
  createData('#ORD-1006', 'Zainab Noor', 1, 'PKR 650', 'Unpaid'),
  createData('#ORD-1007', 'Hamza Tariq', 2, 'PKR 1,400', 'Paid'),
  createData('#ORD-1008', 'Fatima Bibi', 3, 'PKR 980', 'Unfulfilled'),
  createData('#ORD-1009', 'Ali Raza', 6, 'PKR 4,500', 'Paid'),
  createData('#ORD-1010', 'Mariam Shah', 2, 'PKR 1,120', 'Unpaid'),
];

const Orders = () => {
  const { theme } = useContext(ThemeContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows] = useState(initialRows);
  const [filterbtn, setFilterbtn] = useState("All"); // Default 'All' selected

  const boxData = [
    { title: "Total Order Value", value: "PKR 6,443", icon: <LuCircleDollarSign />, trendColor: "green" },
    { title: "Return Orders", value: "6", icon: <LuRotateCcw />, trendColor: "red" },
    { title: "Pending Shipments", value: "14", icon: <LuClock />, trendColor: "orange" },
    { title: "Active Customers", value: "1,280", icon: <LuUsers />, trendColor: "blue" }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Step 1: Filtering Logic implementation
  const filteredRows = rows.filter((row) => {
    if (filterbtn === 'All') return true;
    return row.status.toLowerCase() === filterbtn.toLowerCase();
  });

  return (
    <div className={`orders-page-wrapper ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="orders">
        <div className="left_col">
          <div className="orders_header">
            <CiWavePulse1 size={20} />
            <h3>STORE OPERATION</h3>
          </div>
          <h1>Orders, without the guesswork.</h1>
          <p>
            A live view of checkout records, line items, payment state, and product
            availability. One order can have many normalized Order Items.
          </p>
        </div>

        <div className="right_col">
          <Button variant="text">
            <LuRefreshCcw size={20} style={{ marginRight: '8px' }} /> Refresh Records
          </Button>
        </div>
      </div>

      <div className="boxes_container">
        {boxData.map((item, index) => (
          <div className="box" key={index}>
            <div>
              <h3>{item.title}</h3>
              <h1>{item.value}</h1>
            </div>
            <div className={`icon_wrapper ${item.trendColor}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className='orders-box'>
        <div className='orders-details'>
          {/* Step 2: Buttons with onClick handlers updating the state */}
          <div className="orders-filters">

            <Button 
              variant="text" 
              onClick={() => setFilterbtn('All')}
              className={filterbtn === 'All' ? 'active-filter' : ''}
            >
              All
            </Button>

            <Button 
              variant="text" 
              onClick={() => setFilterbtn('Unpaid')}
              className={filterbtn === 'Unpaid' ? 'active-filter' : ''}
            >
              Unpaid
            </Button>

            <Button 
              variant="text" 
              onClick={() => setFilterbtn('Unfulfilled')}
              className={filterbtn === 'Unfulfilled' ? 'active-filter' : ''}
            >
              Unfulfilled
            </Button>
          </div>

          <div className='orders-header'>
            <SearchBox />
            <GoSortDesc size={20} />
          </div>
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none', backgroundColor: 'transparent' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 600 }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Step 3: Map over filteredRows instead of original rows */}
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.orderId}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Step 4: Update count based on filteredRows length */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRows.length}
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

export default Orders;

