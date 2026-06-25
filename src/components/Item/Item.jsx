'use client'
import React from 'react'
import './item.css'
import Image from 'next/image' // next/image import karein
import Link from 'next/link'
import { getImageUrl } from '@/constants/cloudinary'

const Item = (props) => {
  const imageSource = props.image.startsWith('http') 
    ? props.image 
    : getImageUrl(props.image);

  return (
    <div className='item'>
      <Link href={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <div style={{ position: 'relative', width: '100%', height: '450px' }}> {/* Container size zaroori hai */}
          <Image 
            src={imageSource} 
            alt={props.name} 
            fill // Container ke size ke hisaab se fill karega
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{ objectFit: 'cover' }} // Image ko stretch hone se bachane ke liye
            className="product-image"
          />
        </div>
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





