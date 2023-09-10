import { FormEvent, MouseEventHandler, useState } from 'react'
import { AdminProduct, UpsertProduct } from '../../../../models/Products'
import { useMutation } from 'react-query'
import {
  addToWishlistByProductId,
  deleteFromWishlistByProductId,
} from '../../../apis/wishlist'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { useAuth0 } from '@auth0/auth0-react'
import { modifyProductById } from '../../../apis/products'
import { text } from 'express'
import { useParams } from 'react-router-dom'


interface EditProductProps {
  product: AdminProduct
}

function EditProduct({
  product,
}: EditProductProps) {
  // const [productName,setProductName] = useState
  const [editedProduct, setEditedProduct] = useState<UpsertProduct>(product)
  const { getAccessTokenSilently } = useAuth0() // Use Auth0 to get the access token
  const params = useParams()
  const id = Number(params.id)
  const ProductMutation = useMutation(
    async () => {
      const token = await getAccessTokenSilently()

      const modal: UpsertProduct = {
        description: editedProduct.description,
        image: editedProduct.image,
        isEnabled: editedProduct.isEnabled,
        name: editedProduct.name,
        price: editedProduct.price,
        stock: editedProduct.stock
      };

      console.log('editedProduct', modal)
      return modifyProductById(id, modal, token)
    },
    {
      onSuccess: () => {
        console.log('saved')
      },
    },
  )

  const saveChanges = async (event: FormEvent) => {
    event.preventDefault()

    await ProductMutation.mutate()
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = event.target

    if (type == 'number') {
      setEditedProduct((prevProduct) => ({ ...editedProduct, [name]: parseInt(value) }))
      return
    }

    setEditedProduct((prevProduct) => ({ ...editedProduct, [name]: value }))
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target

    setEditedProduct((prevProduct) => ({ ...editedProduct, [name]: value }))
  }

  function handleClick() {
    setEditedProduct((prevProduct) => ({ ...editedProduct, isEnabled: !editedProduct.isEnabled }))
  }


  return (
    <form>
      <div className="flex items-center max-w-5xl" style={{ padding: '10px' }}>
        <div className="w-1/2">
          <img src={product.image} alt={product.name} className="w-full" />

          {/* fix upload image */}
          <label>
            UPLOAD IMAGE
            <input type="file" id="image" name="image" accept="image/png, image/jpeg" />
          </label>
        </div>


        <div className="w-1/2 ml-4">
          <div className="flex items-center">
            <input className="text-3xl font-bold" onChange={handleChange} name='name' type='text' value={editedProduct.name}></input>
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick} name='isEnabled' disabled={!editedProduct.isEnabled} type='button'>Enabled</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick} name='isEnabled' disabled={editedProduct.isEnabled} type='button'>Disabled</button>

          <div className="flex items-center">
            <span className="text-3xl font-bold">$</span>
            <input className="text-3xl font-bold" onChange={handleChange} name='price' type='number' value={editedProduct.price}></input>
          </div>

          <div className="flex items-center">
            <input className="text-3xl font-bold" onChange={handleChange} name='stock' type='number' value={editedProduct.stock}></input>
          </div>

          <textarea rows={10} className="text-xl" onChange={handleDescriptionChange} name='description' value={editedProduct.description}></textarea>

          {ProductMutation.isError ? <p>Error adding product to cart</p> : null}
        </div>
      </div>
      <button
        className="ml-2 mr-2 mt-6 rounded-md bg-black text-white p-4 w-full text-2xl font-bold"
        type="button"
        onClick={saveChanges}
      >
        SAVE CHANGES
      </button>
    </form>
  )
}

export default EditProduct
