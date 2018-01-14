import React, { Component } from 'react'
import './App.css'

import StartPage from './components/StartPage/StartPage'
import VotingPage from './components/VotingPage/VotingPage'
import ThanksPage from './components/ThanksPage/ThanksPage'
import SorryPage from './components/SorryPage/SorryPage'

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-background" />
          <Route exact path="/" component={StartPage} />
          <Route path="/vote" component={VotingPage} />
          <Route path="/sorry" component={SorryPage} />
          <Route path="/thanks" component={ThanksPage} />
        </div>
      </Router>
    )
  }
}

export default App
