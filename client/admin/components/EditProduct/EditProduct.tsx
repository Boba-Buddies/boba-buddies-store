import { FormEvent, useState } from 'react'
import { AdminProduct, UpsertProduct } from '../../../../models/Products'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { modifyProductById } from '../../../apis/products'
import { redirect, useParams } from 'react-router-dom'

interface EditProductProps {
  product: AdminProduct
}

function EditProduct({
  product,
}: EditProductProps) {


  // const [editedProduct, setEditedProduct] = useState<UpsertProduct>(product)
  const [editedProduct, setEditedProduct] = useState({
    description: product.description,
    image: product.image,
    isEnabled: !!product.isEnabled,
    name: product.name,
    price: product.price,
    stock: product.stock
  } as UpsertProduct)
  console.log('product', product)
  console.log('editedProduct', editedProduct)

  const { getAccessTokenSilently } = useAuth0()
  const params = useParams()
  const id = Number(params.id)
  const queryClient = useQueryClient()

  const updateProductMutation = useMutation(
    async ({ id, editedProduct }: { id: number, editedProduct: UpsertProduct }) => {
      const token = await getAccessTokenSilently()

      return modifyProductById(id, editedProduct, token)
    },
    {
      onSuccess: () => {

        alert('Changes saved successfully!')
        queryClient.invalidateQueries('getProduct')

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

    console.log('I am the saveFunction', editedProduct)

    await updateProductMutation.mutate({ id, editedProduct })
  }

  return (
    <form>
      <div className="flex flex-col max-w-5xl" style={{ padding: '10px' }}>
        <div className="flex flex-row items-center mb-16">
          <img src={product.image} alt={product.name} className="w-1/4" />

          <div className="w-1/2 flex flex-col justify-center">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imageUrl"
            >
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
        <div className='w-4/5'>
          <div className='flex flex-row justify-between'>
            <div className='ml-6'>
              <button
                className={`font-bold text-white py-2 px-4 rounded ${editedProduct.isEnabled ? 'bg-green-500' : 'bg-red-500'
                  }`}
                type="button"
                onClick={toggleEnabled}
              >
                {editedProduct.isEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <button
              className="font-bold py-2 px-4 rounded bg-black text-white"
              type="button"
              onClick={saveChanges}
            >
              SAVE CHANGES
            </button>
          </div>


          <div className='mt-6 ml-6'>
            <input className="text-3xl font-bold" onChange={handleChange} name='name' type='text' value={editedProduct.name}></input>
          </div>

          <div className='flex flex-row justify-between mt-6 ml-6'>
            <div className=" flex items-center text-3xl font-bold mr-6">
              <label className='w-max' htmlFor="price">Price: $</label>
              <input className='border ml-1' onChange={handleChange} name='price' type='number' value={editedProduct.price}></input>
            </div>

            <div className="flex items-center text-3xl font-bold">
              <label htmlFor="stock"> Stock: </label>
              <input className='border ml-1' onChange={handleChange} name='stock' type='number' value={editedProduct.stock}></input>
            </div>
          </div>

          <div className='mt-6'>
            <label className='text-3xl font-bold ml-6' htmlFor="description">Description</label>
            <textarea rows={10} cols={100} className="border text-xl ml-6 w-max" onChange={handleChange} name='description' value={editedProduct.description}></textarea>
          </div>

        </div>

      </div>
    </form>
  )
}

export default EditProduct
