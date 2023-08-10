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
import ProductPreview from '../../components/Product/ProductPreview'

const ProductPage = () => {
  const params = useParams()
  const id = Number(params.id)

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery(['getProduct', id], async () => {
    return await fetchProductById(id)
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {(error as { message: string }).message}</div>
  }

  return (
    <>
      {' '}
      {product && (
        <div className="flex justify-center" style={{ marginTop: '100px' }}>
          <ProductPreview product={product} />
        </div>
      )}
    </>
  )
}

export default ProductPage
