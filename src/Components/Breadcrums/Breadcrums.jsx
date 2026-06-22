
import React from 'react'
import './Breadcrum.css'

const Breadcrums = (props) => {
  const { product } = props;
  return (
    <div className='breadcrum'>
      <span>HOME</span>
      <img src="/assets/breadcrum_arrow.png" alt="arrow" />
      <span>SHOP</span>
      <img src="/assets/breadcrum_arrow.png" alt="arrow" />
      <span>{product.category}</span>
      <img src="/assets/breadcrum_arrow.png" alt="arrow" />
      <span className="current-product">{product.name}</span>
    </div>
  )
}

export default Breadcrums



