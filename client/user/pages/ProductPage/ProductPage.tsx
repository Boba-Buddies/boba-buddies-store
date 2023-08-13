import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ChangeEvent } from 'react'
import { fetchProductById } from '../../../apis/products'
import {
  fetchReviewsByProductId,
  createReviewByUserId,
  deleteReviewByProductId,
} from '../../../apis/reviews'
import ProductPreview from '../../components/Product/ViewProduct'
import LoadError from '../../components/LoadError/LoadError'

const ProductPage = () => {
  const params = useParams()
  const id = Number(params.id)

  const { data: product, status } = useQuery(['getProduct', id], async () => {
    return await fetchProductById(id)
  })

  return (
    <>
      <LoadError status={status} />
      {product && (
        <div className="flex justify-center" style={{ marginTop: '100px' }}>
          <ProductPreview product={product} />
          <div></div>
        </div>
      )}
    </>
  )
}

export default ProductPage
