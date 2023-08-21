import { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { fetchUser, modifyUserDetails } from '../../../apis/users'
import { UpdateUser } from '../../../../models/Users'
import LoadError from '../../components/LoadError/LoadError'

const EditProfile = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { data: userData, status } = useQuery('fetchUser', fetchUser)

  const initialFormData = {
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phoneNumber: userData?.phoneNumber || '',
    address: userData?.address || '',
    city: userData?.city || '',
    country: userData?.country || '',
    zipCode: userData?.zipCode || '',
  }

  const [formData, setFormData] = useState(initialFormData)

  const mutation = useMutation(
    (formDataToUpdate: UpdateUser) => {
      return modifyUserDetails(formDataToUpdate)
    },
    {
      onMutate: (formDataToUpdate: UpdateUser) => {
        queryClient.setQueryData('user', formDataToUpdate)
        return formDataToUpdate
      },
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        navigate('/profile')
      },
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow-lg mt-4">
      <LoadError status={status} />
      <h2 className="text-2xl text-center mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block font-semibold mb-1">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block font-semibold mb-1">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-semibold mb-1">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block font-semibold mb-1">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block font-semibold mb-1">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block font-semibold mb-1">
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="zipCode" className="block font-semibold mb-1">
            Zip Code:
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
