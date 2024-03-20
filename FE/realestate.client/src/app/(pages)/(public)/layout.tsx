import Footer from '@/components/shareLayout/footer'
import React from 'react'

const PublicLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}

export default PublicLayout
