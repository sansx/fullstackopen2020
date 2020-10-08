import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ error = false }) => {
  const { msg, errMsg } = useSelector(state => state.notice)
  const message = error ? errMsg : msg

  if (message === null || message === '') {
    return null
  }

  return (
    <div className={error ? 'error' : 'success'}>
      {message}
    </div>
  )
}


export default Notification




