// @flow

import React from 'react'
import { render } from 'react-dom'

import TestComponent from './TestComponent'

class App extends React.Component {
  render () {
    return (
      <div>
        <p>Hello React!</p>
        <TestComponent />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
