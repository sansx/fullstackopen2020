import React, { useState } from 'react'
import {
  // BrowserRouter as Router,
  useHistory,
  useRouteMatch,
  Switch, Route, Link
} from "react-router-dom"
import { useField } from "./hooks/index"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, vote }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}  >{anecdote.content}</Link> <button onClick={() => vote(anecdote.id)} >vote </button> </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
    Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
    such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, resetCon] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [info, resetInfo] = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetVal = () => {
    resetCon()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button><button type={'button'} onClick={resetVal} >reset</button>
      </form>
    </div>
  )
}

const Detail = ({ anecdote }) => {

  return <div>
    <h2> {anecdote.content} by {anecdote.author} </h2>
    <div> has {anecdote.votes} votes </div>
  </div>

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [timer, setTimer] = useState(null)

  const [notification, setNotification] = useState('')
  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    history.push('/')
    setNotice(`a new anecdote ${anecdote.content} created!`)
  }

  const setNotice = (msg, countdown = 10) => {
    clearTimeout(timer)
    setNotification(msg)
    setTimer(setTimeout(() => {
      setNotification('')
    }, countdown * 1000));
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(e => Number(e.id) === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <div> {notification} </div>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/anecdotes/:id">
          <Detail anecdote={anecdote} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} vote={vote} />
        </Route>
      </Switch>
      <Footer />
    </div>

  )
}

export default App;
