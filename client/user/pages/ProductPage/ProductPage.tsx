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
      {product && (
        <div>
          <p>{product.image}</p>
          <div style={{ width: '100px', height: '100px' }}>
            <img
              src="/images/oolong-milk-tea.svg"
              alt={product.name}
              style={{ width: '100%' }}
            />
          </div>
          <div></div>
        </div>
      )}
    </>
  )
}

export default ProductPage
