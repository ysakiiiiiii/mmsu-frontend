import React from 'react'
import ProtectedRouting from '../../auth/ProtectedRouting'


const Cart = () => {
  return (
    <ProtectedRouting>
      <div>Cart</div>
    </ProtectedRouting>
  )
}

export default Cart