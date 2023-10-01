interface LoadErrorProps {
  status:
    | ('idle' | 'error' | 'loading' | 'success')
    | ('idle' | 'error' | 'loading' | 'success')[]
}

function LoadError({ status }: LoadErrorProps) {
  const combinedStatus = Array.isArray(status)
    ? status.includes('loading')
      ? 'loading'
      : status.includes('error')
      ? 'error'
      : status.includes('idle')
      ? 'idle'
      : 'success'
    : status

  if (combinedStatus === 'loading') {
    return (
      <></>
      // <div className="fixed top-4 mt-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-md z-50">
      //   Loading...
      // </div>
    )
  }

  if (combinedStatus === 'error') {
    return (
      <></>
      // <div className="fixed top-4 mt-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-md z-50">
      //   An error occurred
      // </div>
    )
  }

  return null
}

export default LoadError
