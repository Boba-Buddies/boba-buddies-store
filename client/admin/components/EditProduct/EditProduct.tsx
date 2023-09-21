import { FormEvent, useState } from 'react'
import { AdminProduct, UpsertProduct } from '../../../../models/Products'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { modifyProductById } from '../../../apis/products'
import { useNavigate, useParams } from 'react-router-dom'

interface EditProductProps {
  product: AdminProduct
}

function EditProduct({ product, }: EditProductProps) {

  const [editedProduct, setEditedProduct] = useState({
    description: product.description,
    image: product.image,
    isEnabled: !!product.isEnabled,
    name: product.name,
    price: product.price,
    stock: product.stock
  } as UpsertProduct)

  const { getAccessTokenSilently } = useAuth0()
  const params = useParams()
  const id = Number(params.id)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const updateProductMutation = useMutation(
    async ({ id, editedProduct }: { id: number, editedProduct: UpsertProduct }) => {
      const token = await getAccessTokenSilently()

      return modifyProductById(id, editedProduct, token)
    },
    {
      onSuccess: () => {

        alert('Changes saved successfully!')
        queryClient.invalidateQueries('getProduct')
        navigate('/admin/products-summary')

      },
      onError: (error) => {
        console.error('Product edit error', error)
      }
    },
  )

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    let finalValue: number | string
    if (name === 'price') {
      finalValue = Math.max(parseFloat(value), 0)
    } else if (name === 'stock') {
      finalValue = Math.max(Math.round(parseFloat(value)), 0)
    } else {
      finalValue = value
    }

    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: finalValue }))
  }


  const toggleEnabled = () => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      isEnabled: !prevProduct.isEnabled,
    }))
  }

  const saveChanges = async (event: FormEvent) => {
    event.preventDefault()
    await updateProductMutation.mutate({ id, editedProduct })

  }

  return (
    <form>
      <div className="flex flex-col max-w-5xl mx-auto p-4">
        <div className="mt-4 flex flex-row justify-between flex-wrap">

          <div className="lg:w-2/4">
            <img src={product.image} alt={product.name} className="w-full" />
          </div>

          <div className="lg:w-2/4 p-4 self-end">

            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
              Image URL:
            </label>
            <input
              id="imageUrl"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="image"
              value={editedProduct.image}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="p-4">

          <div className="mt-4 flex flex-row justify-between">
            <button
              className={`font-bold mt-4 lg:mt-0 lg:ml-4 text-white py-2 px-4 rounded ${editedProduct.isEnabled ? 'bg-green-500' : 'bg-red-500'
                }`}
              type="button"
              onClick={toggleEnabled}
            >
              {editedProduct.isEnabled ? 'Enabled' : 'Disabled'}
            </button>

            <button
              className="font-bold py-2 px-4 rounded bg-black text-white transition-colors hover:bg-sky-600 hover:text-black 
              mt-4 lg:mt-0 lg:ml-4"
              type="button"
              onClick={saveChanges}
            >
              SAVE CHANGES
            </button>
          </div>

          <div className="mt-4">
            <input
              className="text-3xl font-bold w-full"
              onChange={handleChange}
              name="name"
              type="text"
              value={editedProduct.name}
            />
          </div>

          <div className="mt-4 flex flex-row justify-between">

            <div className="flex flex-col lg:flex-row justify-between mt-4">
              <div className="lg:flex items-center text-sm font-bold">
                <label className="w-max" htmlFor="price">
                  Price: $
                </label>
                <input
                  className="border ml-1 w-full lg:w-1/2"
                  onChange={handleChange}
                  name="price"
                  type="number"
                  value={editedProduct.price}
                />
              </div>

              <div className="lg:flex items-center text-sm font-bold mt-4 lg:mt-0">
                <label htmlFor="stock"> Stock: </label>
                <input
                  className="border ml-1 w-full lg:w-1/2"
                  onChange={handleChange}
                  name="stock"
                  type="number"
                  value={editedProduct.stock}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm">
            <label className="font-bold" htmlFor="description">
              Description
            </label>
            <textarea
              rows={10}
              cols={100}
              className="border w-full mt-2"
              onChange={handleChange}
              name="description"
              value={editedProduct.description}
            ></textarea>
          </div>
        </div>
      </div>
    </form>
  );
}


export default EditProduct
