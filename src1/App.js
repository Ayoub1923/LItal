import React, { Component } from 'react'
import Sign from './signup/sign'
import { BrowserRouter, Route } from 'react-router-dom'
import Forgotpass from './signup/forgotpass'
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Sign} />
          <Route exact path="/forgotpass" component={Forgotpass} />
        </div>
      </BrowserRouter>
    )
  }
}
