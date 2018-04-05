import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Blog from './containers/Blog/Blog'

class App extends Component {
  render () {
    return (
      // <BrowserRouter basename='/'> default value for basename is '/' but we
      // can override it if the server has the application under some folder,
      // example /react-app
      <BrowserRouter>
        <div>
          <Blog />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
