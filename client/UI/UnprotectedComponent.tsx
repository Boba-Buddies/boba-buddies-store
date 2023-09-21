import React from 'react'

interface Props {
  component: React.ComponentType<unknown>
}

export const UnprotectedComponent = ({ component: Component }: Props) => {
  return <Component />
}

export default UnprotectedComponent
