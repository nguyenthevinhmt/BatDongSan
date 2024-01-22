import React from 'react'

const AuthLayout = ({children} : {children : React.ReactElement}) => {
  return (
    <div>
        <h1>Auth Layout</h1>
        {children}
    </div>
  )
}

export default AuthLayout
