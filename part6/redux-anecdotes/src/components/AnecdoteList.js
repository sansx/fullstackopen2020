import React from 'react'
import { connect } from 'react-redux'
import { vote as toVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {
  const { filter: { filter }, anecdotes } = props

  const vote = (anecdote) => {
    props.toVote(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return anecdotes.filter(e => !!filter ? e.content.includes(filter) : true).map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(
  mapStateToProps,
  { toVote, setNotification }
)(AnecdoteList);
