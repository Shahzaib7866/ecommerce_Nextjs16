import React from 'react'
import './description.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="description-nav-box active">Description</div>
            <div className="descriptionbox-nav-box-fade">Reviews (122)</div>
        </div>

        <div className="descriptionbox-description">
            <p>
                Discover the perfect combination of contemporary lifestyle design and high craftsmanship. Every detail is structurally engineered for peak everyday efficiency. This versatile product introduces sleek aesthetics built using top-grade dynamic fabrics ensuring a supreme touch against skin, unparalleled breathability, and reliable product longevity.
            </p>
            <p>
                An e-commerce absolute favorite featuring highly structured stitch lines and customized dynamic alignments. Perfect for multi-seasonal layering configurations or premium minimalistic standalone statements.
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox