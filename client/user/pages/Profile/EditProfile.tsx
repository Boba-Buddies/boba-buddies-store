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
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData?.firstName || ''} // Provide a default value or use optional chaining
            onChange={(e) => {
              if (formData) {
                const { name, value } = e.target
                mutation.mutate({ ...formData, [name]: value })
              }
            }}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
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
