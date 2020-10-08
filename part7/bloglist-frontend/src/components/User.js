import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const User = () => {
  const user = useSelector( state => state.user )
  if (!user) {
    return null
  }

  return (
    <div>
      // ...
    </div>
  )
}


export default User;



