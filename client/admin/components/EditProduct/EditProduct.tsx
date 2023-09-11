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
        isEnabled: true,  // how to solve editedProduct.isEnabled = 1 ???
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
      <div className="flex flex-col max-w-5xl" style={{ padding: '10px' }}>
        <div className="flex flex-row items-center mb-16">
          <img src={product.image} alt={product.name} className="w-1/4" />

          {/* fix upload image */}
          <label>
            UPLOAD IMAGE
            <input type="file" id="image" name="image" accept="image/png, image/jpeg" />
          </label>
        </div>

        <div className='w-4/5'>

          <div className='flex flex-row justify-between'>
            <div className='ml-6'>
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleClick} name='isEnabled' disabled={!editedProduct.isEnabled} type='button'>Enabled</button>
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleClick} name='isEnabled' disabled={editedProduct.isEnabled} type='button'>Disabled</button>
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
            <textarea rows={10} cols={100} className="border text-xl ml-6 w-max" onChange={handleDescriptionChange} name='description' value={editedProduct.description}></textarea>
          </div>

        </div>

      </div>
    </form>
  )
}

export default EditProduct
