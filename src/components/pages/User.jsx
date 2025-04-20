import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthWrapper';

export const Account = () => {

  const { user } = useContext(AuthContext);

  return (
       <div className="page">
            <h2>Your Account</h2>
            <p>Username: {user.name}</p>
       </div>
  )
}

export default Account