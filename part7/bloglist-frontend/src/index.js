import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { BrowserRouter as Router, } from 'react-router-dom'

ReactDOM.render(<Router><Provider store={store}><App /></Provider></Router>, document.getElementById('root'))