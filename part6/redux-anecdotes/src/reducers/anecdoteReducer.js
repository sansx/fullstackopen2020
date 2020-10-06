import anecdoteService from '../services/anecdote'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "VOTE":
      const {
        anecdote
      } = action.data
      return state.map(e => e.id === anecdote.id ? anecdote : e).sort((a, b) => b.votes - a.votes);
    case "NEW_ANECDOTE":
      return [
        ...state,
        action.data
      ];
    case 'INIT_ANECDOTE':
      return action.data.sort((a, b) => b.votes - a.votes);
    default:
      return state;
  }
}

export const create = (content) => async dispatch => {
  const info = await anecdoteService.createNew(content)
  dispatch({
    type: 'NEW_ANECDOTE',
    data: info
  })
}

export const vote = id => async (dispatch, getState) => {
  const state = getState().anecdotes;
  const res = state.find(e => e.id === id)

  let anecdote = await anecdoteService.updateObj(id, {
    ...res,
    votes: ++res.votes
  })

  dispatch({
    type: 'VOTE',
    data: {
      anecdote
    }
  })
}

export const initAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch({
    type: 'INIT_ANECDOTE',
    data: anecdotes,
  })
}


export default reducer