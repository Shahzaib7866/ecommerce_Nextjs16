'use client'
import React, { useContext } from 'react'
import { ShopContext } from '../../../Context/ShopContextValue'
import { useParams } from 'next/navigation'
import Breadcrums from '../../../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../../../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../../../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../../../Components/RelatedProducts/RelatedProducts'

const Product = () => {
  const { all_product } = useContext(ShopContext)
  const { productId } = useParams()
  const product = all_product.find((e) => e.id === Number(productId))

  if (!product) {
    return <div style={{ padding: "100px", textAlign: "center", fontSize: "20px" }}>Product Not Found</div>
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts category={product.category} currentId={product.id} />
    </div>
  )
}

export default Product