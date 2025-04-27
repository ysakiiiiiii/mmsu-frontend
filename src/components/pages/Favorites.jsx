import React from 'react'
import ProtectedRouting from '../../auth/ProtectedRouting'

const Favorites = () => {
  return (
    <ProtectedRouting>
      <div>Favorites</div>

    </ProtectedRouting>
  )
}

export default Favorites