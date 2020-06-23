import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import GetPassword from './getpass'
import './sign.css'

export default class Forgotpass extends Component {
  state = {
    forgottenPass: ""
  }
  render() {
    return (
      <div className='login-page'>
        <div className="forgot-pass-box">
          <h5>Entrez votre adresse mail :</h5>
          <input className="forgot-pass-input" onChange={(e) => this.setState({ forgottenPass: e.target.value })
          }></input>
          <div className='forgot-buttons'>
            <GetPassword forgottenPass={this.state.forgottenPass} />
            <Link to="/"><button className='cancel'>Retour</button></Link>
          </div>
        </div>
      </div>
    )
  }
}