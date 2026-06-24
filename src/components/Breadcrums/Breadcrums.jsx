
import React from 'react'
import './Breadcrum.css'
import { getImageUrl } from '@/constants/cloudinary'


const Breadcrums = (props) => {
  const { product } = props;
  return (
    <div className='breadcrum'>
      <span>HOME</span>
      <img src={getImageUrl("/breadcrum_arrow.png")} alt="arrow" />
      <span>SHOP</span>
      <img src={getImageUrl("/breadcrum_arrow.png")} alt="arrow" />
      <span>{product.category}</span>
      <img src={getImageUrl("/breadcrum_arrow.png")} alt="arrow" />
      <span className="current-product">{product.name}</span>
    </div>
  )
}

export default Breadcrums



