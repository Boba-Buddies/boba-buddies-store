import { FormEvent, useState } from 'react'
import { QueryClient, useMutation, useQueryClient } from 'react-query'
import { NewEmail } from '../../../../models/Emails'
import { createNewEmail } from '../../../apis/emails'

function Contact() {

  const mutations = useMutation(createNewEmail)

  const [newEmail, setNewEmail] = useState({ title: '', description: '' } as NewEmail)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setNewEmail((prevEmail) => ({ ...newEmail, [name]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!newEmail.title || !newEmail.description) {
      alert('Title and description both are required')
      return
    }

    mutations.mutate(newEmail, {
      onSuccess: () => {
        setNewEmail({ title: '', description: '' })
      }
    })
  }



  return (
    <>
      <form className='flex flex-col'>
        <label htmlFor="title" className='mt-8 ml-2'>Title</label>
        <input className='mt-2 ml-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" name='title' onChange={handleChange} value={newEmail.title} required />
        <label htmlFor="description" className='mt-8 ml-2'>Message(description)</label>
        <input className='mt-6 ml-2 h-28 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' name="description" onChange={handleChange} value={newEmail.description} required />
        <button className='bg-pink-400 hover:bg-yellow-300 text-light-blue-300 font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out mt-6' type='button' onClick={handleSubmit}>Submit</button>
      </form>
    </>
  )
}

export default Contact
