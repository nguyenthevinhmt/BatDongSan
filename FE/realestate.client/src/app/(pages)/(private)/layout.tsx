import React from 'react'

const PrivateLayout = ({children} : {children: React.ReactElement}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default PrivateLayout
