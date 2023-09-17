import { useAuth0 } from '@auth0/auth0-react'
import { UpsertProduct } from '../../../../models/Products'
import { createProduct } from '../../../apis/products'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import LoadError from '../../../user/components/LoadError/LoadError'

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState<UpsertProduct>({
    image: '',
    isEnabled: false,
    name: '',
    price: 0,
    description: '',
    stock: 0,
  })

  const [isFormComplete, setIsFormComplete] = useState(false)

  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  const addProductMutation = useMutation(
    async (newProduct: UpsertProduct) => {
      const token = await getAccessTokenSilently()
      return createProduct(newProduct, token)
    },
    {
      onSuccess: () => {
        goTo('/admin/product-summary')
      },
    },
  )

  useEffect(() => {
    const { image, name, price, description, stock } = newProduct
    if (image && name && price && description && stock) {
      setIsFormComplete(true)
    } else {
      setIsFormComplete(false)
    }
  }, [newProduct])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    const finalValue =
      name === 'price' || name === 'stock' ? parseFloat(value) : value

    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: finalValue }))
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    setNewProduct((prevProduct) => ({ ...prevProduct, isEnabled: checked }))
  }

  const handleSubmit = () => {
    addProductMutation.mutate(newProduct)
  }

  return (
    <>
      <LoadError status={addProductMutation.status} />
      <div className="container mx-auto mt-12" style={{maxWidth : '500px'}}>
        <h1 className="text-3xl font-semibold mb-4">Add Product</h1>
        <form>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Stock:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image URL:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <img
              src={newProduct.image}
              alt="Product preview"
              className="w-24"
            />
          </div>
          <div className="mb-4 flex">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enabled:
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              checked={newProduct.isEnabled}
              onChange={handleCheckboxChange}
            />
          </div>
          
          
          
          <div className="mb-4">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                !isFormComplete && 'opacity-50 cursor-not-allowed'
              }`}
              type="button"
              disabled={!isFormComplete}
              onClick={handleSubmit}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddProduct

/*
UpsertProduct: {
    image: string;
    isEnabled: boolean;
    name: string;
    price: number;
    description: string;
    stock: number;
}
*/
