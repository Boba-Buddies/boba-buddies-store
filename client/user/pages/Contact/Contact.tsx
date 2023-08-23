import { FormEvent, useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { NewEmail } from '../../../../models/Emails'
import { createNewEmail } from '../../../apis/emails'

function Contact() {

  const mutations = useMutation(createNewEmail)

  const [newEmail, setNewEmail] = useState({ title: '', description: '' } as NewEmail)

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
      alert('Title and description both are required')
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
    <>
      <div className='mt-8 text-2xl text-center font-bold'>Contact Admin</div>
      {alertMessage && <div className="bg-green-200 text-green-800 p-2 mt-2 rounded">{alertMessage}</div>}
      <form className='flex flex-col'>
        <label htmlFor="title" className='mt-8 ml-2 text-2xl'>Title</label>
        <input className='mt-2 ml-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black' type="text" name='title' onChange={handleChange} value={newEmail.title} required />
        <label htmlFor="description" className='mt-8 ml-2 text-2xl'>Message(description)</label>
        <textarea className='mt-6 ml-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black' name="description" onChange={handleMessageChange} value={newEmail.description} placeholder='Try your message here' rows={6} required />
        <button className='ml-2 mr-2 mt-6 rounded-md bg-black text-white p-4 w-full text-2xl font-bold' type='button' onClick={handleSubmit}>Submit</button>
      </form>
    </>
  )
}

export default Contact
