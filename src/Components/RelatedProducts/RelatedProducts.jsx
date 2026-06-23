'use client'
import React, { useContext } from 'react'
import './relatedproducts.css'
import { ShopContext } from '../../context/ShopContextValue'
import Item from '../Item/Item'


const RelatedProducts = ({ category, currentId }) => {
  const { all_product } = useContext(ShopContext)

  const related = all_product
    .filter((item) => item.category === category && item.id !== currentId)
    .slice(0, 6)

    console.log('category:', category);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <div className="heading-underline"></div>
      <div className="relatedproducts-item">
        {related.map((item) => (
          <Item key={item.id} id={item.id} name={item.name} image={item.image}
            new_price={item.new_price} old_price={item.old_price} />
        ))}
        
      </div>
    </div>
  )
}

export default RelatedProducts