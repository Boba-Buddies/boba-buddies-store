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
        <div className="flex justify-center" style={{ marginTop: '100px' }}>
          <div
            className="flex items-center max-w-5xl border border-black rounded"
            //style={{ background: 'lightGray' }}
          >
            <div className="w-1/2">
              <img
                src="/images/oolong-milk-tea.svg"
                alt={product.name}
                className="w-full"
              />
            </div>
            <div className="w-1/2 ml-4">
              <h1 className="text-xl font-bold">{product.name}</h1>
              <h2 className="text-lg mt-2">${product.price}</h2>
              <p className="mt-1">Rating : {product.averageRating}</p>
              <p className="mt-2">{product.description}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductPage
