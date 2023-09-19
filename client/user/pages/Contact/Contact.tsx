import { FormEvent, useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { NewEmail } from '../../../../models/Emails'
import { createNewEmail } from '../../../apis/emails'
import { useAuth0 } from '@auth0/auth0-react'

function Contact() {
  const { getAccessTokenSilently } = useAuth0()
  const mutations = useMutation(async (newEmail: NewEmail) => {
    const token = await getAccessTokenSilently()
    return createNewEmail(newEmail, token)
  })

  const [newEmail, setNewEmail] = useState({
    title: '',
    description: '',
  } as NewEmail)
  const [alertMessage, setAlertMessage] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setNewEmail((prevEmail) => ({ ...newEmail, [name]: value }))
  }

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target

    setNewEmail((prevEmail) => ({ ...newEmail, [name]: value }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!newEmail.title || !newEmail.description) {
      alert('Please fill out empty fields!')
      return
    }

    try {
      await mutations.mutate(newEmail)
      setNewEmail({ title: '', description: '' })
      setAlertMessage('Message sent successfully!')
    } catch (error) {
      setAlertMessage('An error occurred. Please try again.')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [alertMessage])

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="text-2xl text-center font-bold">Contact</div>
      {alertMessage && (
        <div className="bg-green-200 text-green-800 p-2 mt-2 rounded">
          {alertMessage}
        </div>
      )}
      <form className="mt-6 space-y-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold">
            Topic:
          </label>
          <input
            className="mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
            type="text"
            name="title"
            onChange={handleChange}
            value={newEmail.title}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold">
            Message:
          </label>
          <textarea
            className="mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
            name="description"
            onChange={handleMessageChange}
            value={newEmail.description}
            placeholder="Try your message here"
            rows={6}
            required
          />
        </div>
        <button
          className="bg-black text-white py-2 px-4 rounded-md w-full text-lg font-semibold"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Contact
