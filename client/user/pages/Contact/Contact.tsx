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
    <div className="mx-auto max-w-4xl p-8 min-h-screen">
      <div className="text-3xl text-center font-bold mb-6">Contact Us</div>
      {alertMessage && (
        <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
          {alertMessage}
        </div>
      )}
      <form className="space-y-4">
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
            placeholder="Type your message here"
            rows={6}
            required
          />
        </div>
        <button
          className="bg-black text-white py-2 px-4 rounded-md w-full text-lg font-semibold hover:bg-gray-800 hover:text-gray-100 transition-all duration-300"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.06300832411!2d174.7764339931746!3d-36.8649106243409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47c43b7c00a3%3A0x4abe94b659ab7fb0!2sDev%20Academy%20Aotearoa%20-%20Auckland%20Campus!5e0!3m2!1sen!2snz!4v1695091841249!5m2!1sen!2snz"
          title="map"
          width="830"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <p>(this address is not relevant to this website)</p>
      </div>
    </div>
  )
}

export default Contact
