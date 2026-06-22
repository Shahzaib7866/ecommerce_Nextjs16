'use client'
import React from 'react'
import './item.css'
import ImageWithLoader from '../ImageWithLoader';
import Link from 'next/link'

const Item = (props) => {
  return (
    <div className='item'>
      <Link href={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <ImageWithLoader src={props.image} alt="" />
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