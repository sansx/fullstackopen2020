import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notice)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    notification.msg && <div style={style}>
      {notification.msg}
    </div>
  )
}

export default Notification