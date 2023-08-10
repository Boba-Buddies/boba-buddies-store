interface LoadErrorProps {
  status : "idle" | "error" | "loading" | "success"
}

function LoadError({ status }: LoadErrorProps) {
  if (status === "loading") {
      return <div>Loading...</div>;
  }

  if (status === "error") {
      return <div>An error occurred</div>;
  }

  return null;
}

export default LoadError;