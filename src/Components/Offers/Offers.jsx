import React from 'react'
import './offers.css'
import { getImageUrl } from '@/src/constants/cloudinary'

const Offers = () => {
  return (
    <div className='offers'>
      <div className='offers-left'>
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button>Check Now</button>
      </div>
      <div className='offers-right'>
        <img src={getImageUrl("/exclusive_image.png")} alt="Exclusive Offers" />
      </div>
    </div>
  )
}

export default Offers