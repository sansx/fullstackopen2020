import React from 'react'
import { connect } from 'react-redux'
import { create } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.create(content)
    props.setNotification(`you created '${content}'`, 5)
  }

  return <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote} >
      <div><input name='content' /></div>
      <button>create</button>
    </form>
  </div>
}



export default connect(null, { create, setNotification })(AnecdoteForm);
