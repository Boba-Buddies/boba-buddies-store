import { useAuth0 } from "@auth0/auth0-react"
import { UpsertProduct } from "../../../../models/Products"
import { createProduct } from "../../../apis/products"
import { useMutation } from "react-query"
import { useNavigate } from 'react-router-dom'


const AddProduct = () => {
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
        goTo('/admin/products-summary')
      },
    },
  )

  return (
    <div>AddProduct</div>
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