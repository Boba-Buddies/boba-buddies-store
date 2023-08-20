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
      onSuccess: () => {
        queryClient.invalidateQueries('user')
      },
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  const { data: formData, isLoading } = useQuery('user', () => {
    return fetchUser()
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => {
              // Update the formData immediately when the input changes
              const { name, value } = e.target
              mutation.setData({ ...formData, [name]: value })
            }}
          />
        </div>
        {/* Repeat similar fields for other form inputs */}
        <div>
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Updating...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
