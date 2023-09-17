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
    const { name, value } = event.target;
  
    const finalValue = (name === 'price' || name === 'stock') ? parseFloat(value) : value;
  
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: finalValue }));
  };

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
      <div>
        <h1>Add Product</h1>
        <form>
          <div>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <img src={newProduct.image} alt="Product preview" width={100} />
          </div>
          <div>
            <label>
              Enabled:
              <input
                type="checkbox"
                checked={newProduct.isEnabled}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Stock:
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
              ></textarea>
            </label>
          </div>
          <div>
            <button
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
