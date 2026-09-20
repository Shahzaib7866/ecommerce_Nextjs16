
"use client"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation';
import './admin.css'
import DashBox from '../../../components/admin/DashboardBox/DashBox'
import { FiPlus } from 'react-icons/fi'
import { getImageUrl } from '@/constants/cloudinary'
import { Button } from '@mui/material'
import { ThemeContext } from '../../../context/ThemeContext'
import { 
  Area,
  ComposedChart,
  Line,
  Scatter,
  Legend, 
  AreaChart, 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const page = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedProfit, setSelectedProfit] = useState(0);
  const router = useRouter(); 

  // --- Data ---
  const profileData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 5000, pv: 2400, amt: 2400 },
    { name: 'Page C', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page D', uv: 7000, pv: 1398, amt: 2210 },
    { name: 'Page E', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page F', uv: 10000, pv: 2400, amt: 2400 }
  ];

  // Low Stock Alert Data
  const stockData = [
    { name: 'Black Shirt', stock: 8 },
    { name: 'Jeans', stock: 15 },
    { name: 'Hoodie', stock: 5 },
    { name: 'Sneakers', stock: 12 },
    { name: 'Jacket', stock: 3 },
  ];

  //sales data
  const Salesdata = [
    {
      name: 'JAN',
      revenue: 590,
      expense: 800
    },
   {
      name: 'FEB',
      revenue: 590,
      expense: 800
    },
    {
      name: 'MAR',
      revenue: 700,
      expense: 1000
    },
   {
      name: 'APR',
      revenue: 890,
      expense: 1900
    },
   {
      name: 'MAY',
      revenue: 390,
      expense: 700
    },
       {
      name: 'JUN',
      revenue: 190,
      expense: 200
    },
       {
      name: 'JUL',
      revenue: 590,
      expense: 800
    },
           {
      name: 'AUS',
      revenue: 1590,
      expense: 1800
    },
           {
      name: 'SEP',
      revenue: 590,
      expense: 800
    },
           {
      name: 'OCT',
      revenue: 590,
      expense: 800
    },
           {
      name: 'NOV',
      revenue: 590,
      expense: 800
    },
               {
      name: 'DEC',
      revenue: 590,
      expense: 800
    },
  ]

  const selectProfit=(index)=>{
    setSelectedProfit(index)
  }

  return (
    <>
      {/* Top Welcome Header */}
      <div className="box_dashboard">
        <div className="left_col">
          <h1>Good Morning, <br/> Cameron</h1>
          <p>Welcome back! Here's what's happening today.</p>
          <div>
   <Button 
          variant="text" 
          onClick={() => router.push('/products/add')}
        >
          <FiPlus size={20} style={{ marginRight: '8px' }} /> Add Products 
        </Button>
          </div>
        </div>

        <div className="right_col">
          <img 
            src={theme === 'dark' ? getImageUrl("dashboard_img2") : getImageUrl("dashboard_img")} 
            alt="dashboard image" 
          />
        </div>
      </div>

      {/* Top Statistic Cards */}
      <DashBox />
  
      {/* Main Graphs Container */}
      <div className='graphs-container'>
        
        {/* Left Column: Large Graph Card */}
        <div className='card large-card'>
          <div className='card-header'>
            <div className='title-box'>
              <h3 className='card-title'>Total Profit</h3>
              <span className='card-amount'>$8,948.00</span>
            </div>
            <Button variant="outlined" className='details-btn'>
              Details
            </Button>
          </div>

<div style={{ padding: "5px" }}>
  <div className="duration-filter">
    {['5D', '2W', '1M', '6M', '1Y'].map((label, index) => (
      <span 
        key={index}
        className={`duration-item ${selectedProfit === index ? 'bg-gray-300' : ''}`} 
        onClick={() => selectProfit(index)}
      >
        {label}
      </span>
    ))}
  </div>
</div>


          <div className='card-body-chart'>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={profileData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke='#8884d8' fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Two Small Cards */}
        <div className='right-cards-column'>
  
          {/* 1. Top Products Card */}
          <div className='card small-card top-products-card'>
            <div className='top-products-header'>
              <h3>Top Products</h3>
              <Button variant="outlined" className='details-btn' style={{ marginTop: "14px" }}>
                Details
              </Button>
            </div>

            {/* Product Items */}
            {[1, 2, 3].map((item, index) => (
              <div className='top-products-list' key={index}>
                <img src={getImageUrl("/star_icon.png")} alt="star" className='product-img' />
                <div className='products-name'>
                  <h4>Black Shirt</h4>
                  <p>$45</p>
                </div>
                <span className='product-percentage'>+6%</span>
              </div>
            ))}
          </div>

          {/* 2. Low Stock Alert Card */}
          <div className='card small-card'>
            <h3 className='low-stock-title'>
              Low Stock Alert
            </h3>
            
            <div className='low-stock-chart-container'>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={stockData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={80} 
                    tick={{ fontSize: 11, fill: 'var(--text-main, #333)' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                    contentStyle={{ borderRadius: '6px', fontSize: '12px' }}
                  />
                  <Bar dataKey="stock" radius={[0, 4, 4, 0]}>
                    {stockData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        // Agar stock 5 ya us se kam hai toh Red color, warna Orange
                        fill={entry.stock <= 5 ? '#ff4d4f' : '#faad14'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

<div className="card salesReport">

  <h2>Sales Report</h2>

  <div className='sales-chart'>

    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={Salesdata}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        
        <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke="#8884d8" 
          fillOpacity={1} 
          fill="url(#colorRevenue)" 
        />
        <Bar dataKey="expense" barSize={20} fill='#413ea0' />

      </ComposedChart>
    </ResponsiveContainer>

  </div>

  <br/>

</div>

    </>
  )
}

export default page;
