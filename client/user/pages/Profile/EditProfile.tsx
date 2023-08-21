import { useMutation, useQueryClient, useQuery } from 'react-query'
import { fetchUser, updateUserDetails } from '../../../apis/users'
import { UpdateUser } from '../../../../models/Users'

const EditProfile = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (formData: UpdateUser) => {
      return updateUserDetails(formData)
    },
    {
      onMutate: (formData: UpdateUser) => {
        queryClient.setQueryData('user', formData)
        return formData
      },
      onSuccess: () => {
        queryClient.invalidateQueries('user')
      },
    },
  )

  const { data: formData, isLoading } = useQuery('user', () => {
    return fetchUser()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData) {
      mutation.mutate(formData)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow-lg mt-4">
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
            value={formData?.firstName || ''}
            onChange={(e) => {
              if (formData) {
                const { name, value } = e.target
                mutation.mutate({ ...formData, [name]: value })
              }
            }}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block font-semibold mb-1">
            Last Name:{' '}
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData?.lastName || ''}
            onChange={(e) => {
              if (formData) {
                const { name, value } = e.target
                mutation.mutate({ ...formData, [name]: value })
              }
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-semibold mb-1">
            {' '}
            Phone Number:{' '}
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData?.phoneNumber || ''}
            onChange={(e) => {
              if (formData) {
                const { name, value } = e.target
                mutation.mutate({ ...formData, [name]: value })
              }
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block font-semibold mb-1">
            {' '}
            Address:{' '}
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData?.address || ''}
            onChange={(e) => {
              if (formData) {
                const { name, value } = e.target
                mutation.mutate({ ...formData, [name]: value })
              }
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block font-semibold mb-1">
            {' '}
            City:{' '}
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData?.city || ''}
            onChange={(e) => {
              if (formData) {
                const { name, value } = e.target
                mutation.mutate({ ...formData, [name]: value })
              }
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block font-semibold mb-1">
            {' '}
            Country:{' '}
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData?.country || ''}
            onChange={(e) => {
              if (formData) {
                const { name, value } = e.target
                mutation.mutate({ ...formData, [name]: value })
              }
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="zipCode" className="block font-semibold mb-1">
            {' '}
            Zip Code:{' '}
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData?.zipCode || ''}
            onChange={(e) => {
              if (formData) {
                const { name, value } = e.target
                mutation.mutate({ ...formData, [name]: value })
              }
            }}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
          >
            {mutation.isLoading ? 'Updating...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
