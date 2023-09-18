import { useAuth0 } from '@auth0/auth0-react'
import { UpsertProduct } from '../../../../models/Products'
import { createProduct } from '../../../apis/products'
import { useMutation } from 'react-query'
import React, { useEffect, useState } from 'react'
import LoadError from '../../../user/components/LoadError/LoadError'

const AddProduct = () => {
  const [buttonText, setButtonText] = useState('Add Product')
  const [newProduct, setNewProduct] = useState<UpsertProduct>({
    image: '',
    isEnabled: true,
    name: '',
    price: 0,
    description: '',
    stock: 0,
  })

  const saveToLocalStorage = (state: UpsertProduct) => {
    localStorage.setItem('newProduct', JSON.stringify(state))
  }

  const placeholderImage = '/images/placeholder-image.png'

  const [isFormComplete, setIsFormComplete] = useState(false)

  const { getAccessTokenSilently } = useAuth0()

  const addProductMutation = useMutation(
    async (newProduct: UpsertProduct) => {
      const token = await getAccessTokenSilently()
      return createProduct(newProduct, token)
    },
    {
      onSuccess: () => {
        setButtonText('Product Added')
        setNewProduct({
          image: '',
          isEnabled: true,
          name: '',
          price: 0,
          description: '',
          stock: 0,
        })
        localStorage.removeItem('newProduct')
        setTimeout(() => {
          setButtonText('Add Product')
        }, 2000)
      },
    },
  )

  useEffect(() => {
    const savedProduct = localStorage.getItem('newProduct')
    if (savedProduct) {
      setNewProduct(JSON.parse(savedProduct) as UpsertProduct)
    }
  }, [])

  useEffect(() => {
    const { image, name, price, description, stock } = newProduct
    if (image && name && price && description && stock) {
      setIsFormComplete(true)
    } else {
      setIsFormComplete(false)
    }
    // Save form state to localStorage
    saveToLocalStorage(newProduct)
  }, [newProduct])

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

    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: finalValue }))
  }

  const toggleEnabled = () => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      isEnabled: !prevProduct.isEnabled,
    }))
  }
  const handleSubmit = () => {
    addProductMutation.mutate(newProduct)
  }

  return (
    <>
      <LoadError status={addProductMutation.status} />
      <div className="container mx-auto mt-12" style={{ maxWidth: '500px' }}>
        <h1 className="text-3xl font-semibold mb-4">Add Product</h1>
        <form>
          <div className="flex space-x-4 mb-4">
            <div className="mb-4 w-1/2">
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
            <div className="flex items-center w-1/2 mt-2">
              <button
                className={`font-bold text-white py-2 px-4 rounded ${
                  newProduct.isEnabled ? 'bg-green-500' : 'bg-red-500'
                }`}
                type="button"
                onClick={toggleEnabled}
              >
                {newProduct.isEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
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
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="price"
                min="0"
                value={newProduct.price}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Stock:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="stock"
                min="0"
                step="1"
                value={newProduct.stock}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2 flex flex-col justify-center">
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
            <div
              className="w-1/2 flex justify-center items-center mt-2"
              style={{ maxHeight: '200px' }}
            >
              <img
                src={newProduct.image ? newProduct.image : placeholderImage}
                alt="Product preview"
                style={{ maxHeight: '200px' }}
              />
            </div>
          </div>

          <div className="mb-4">
            <button
              className={`${
                buttonText === 'Add Product'
                  ? 'bg-blue-500 hover:bg-blue-700'
                  : 'bg-green-500 hover:bg-green-700'
              } text-white font-bold py-2 px-4 rounded ${
                !isFormComplete && 'opacity-50 cursor-not-allowed'
              }`}
              type="button"
              disabled={!isFormComplete}
              onClick={handleSubmit}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddProduct
