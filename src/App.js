import React, { Component }  from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'

class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="app">
        <Header title="Welcome to Dashboard"/>
        <Sidebar />
        <Content/>
      </div>
    )
  }
}

export default App
