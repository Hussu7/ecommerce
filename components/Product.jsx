import React from 'react'
import Link from 'next/link';
import { urlFor } from '../lib/client';
import product from '../sanityeecommerce/schemas/product';

const Product = ({product:{image, name, price, slug}}) => {
  return (
    <Link href={`/product/${slug.current}`}>

      <div className='product-card'>
        <img src={urlFor(image && image[0])} alt="headphone" 
        height={250}
        width={250}
        className='product-image'
        />
        <p className='product-name'>{name}</p>
        <p className='product-price'>Rs {price}</p>
      </div>
    </Link>
  )
}

export default Product