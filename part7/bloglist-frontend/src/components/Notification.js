import React from 'react'
import { useSelector } from 'react-redux'
import { Alert  } from 'react-bootstrap'

const Notification = ({ error = false }) => {
  const { msg, errMsg } = useSelector(state => state.notice)
  const message = error ? errMsg : msg

  if (message === null || message === '') {
    return null
  }

  return (
    <Alert variant={error ? 'danger' : 'success'}>
      {message}
    </Alert>
  )
}


export default Notification




