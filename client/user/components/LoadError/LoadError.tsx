interface LoadErrorProps {
  status: ("idle" | "error" | "loading" | "success") | ("idle" | "error" | "loading" | "success")[]
}

function LoadError({ status }: LoadErrorProps) {
  const combinedStatus = Array.isArray(status)
    ? status.includes('loading') ? 'loading' :
      status.includes('error') ? 'error' :
      status.includes('idle') ? 'idle' :
      'success'
    : status

  if (combinedStatus === "loading") {
    return <div>Loading...</div>
  }

  if (combinedStatus === "error") {
    return <div>An error occurred</div>
  }

  return null
}

export default LoadError