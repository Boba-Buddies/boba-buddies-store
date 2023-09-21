import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProductByIdAdmin } from '../../../apis/products'
import { useAuth0 } from '@auth0/auth0-react'
import LoadError from '../../../user/components/LoadError/LoadError'
import EditProduct from '../../components/EditProduct/EditProduct'
import { useEffect } from 'react'

const IndividualProduct = () => {
  const { getAccessTokenSilently } = useAuth0() // Use Auth0 hook
  const params = useParams()
  const id = Number(params.id)

  const { data: product, status: statusProduct, isLoading } = useQuery(
    ['getProduct', id],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchProductByIdAdmin(id, token)
    },
  )



  return (
    <>
      <LoadError status={[statusProduct]} />
      {!isLoading && product && (
        <div
          className="flex flex-col items-center w-full"
          style={{ marginTop: '100px', marginBottom: '150px' }}
        >
          <EditProduct key={product.id}
            product={product}
          />
        </div>
      )}
    </>
  )
}

export default IndividualProduct
