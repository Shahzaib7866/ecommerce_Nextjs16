'use client'
import React from 'react'
import './item.css'
import ImageWithLoader from '../ImageWithLoader';
import Link from 'next/link'
import { getImageUrl } from '@/constants/cloudinary'

const Item = (props) => {
  // Logic: Agar image URL pehle se full hai, toh wahi use karein,
  // warna getImageUrl() chalayein.
  const imageSource = props.image.startsWith('http') 
    ? props.image 
    : getImageUrl(props.image);

  return (
    <div className='item'>
      <Link href={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <ImageWithLoader src={imageSource} alt={props.name} />
      </Link>
      
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
    </div>
  )
}

export default Item


