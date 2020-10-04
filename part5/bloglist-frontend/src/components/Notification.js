import React from 'react'

const Notification = ({ message, error = false }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={error ? 'error' : 'success'}>
      {message}
    </div>
  )
}


export default Notification




