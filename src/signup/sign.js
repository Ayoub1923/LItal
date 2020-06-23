import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/actions'
import './sign.css'
class Sign extends Component {

  state = {
    address: '',
    password: ''
  }
  check = () => {
    let users = this.props.user;
    if (this.state.address === '' || this.state.password === '') alert("Empty fields")
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === this.state.address && users[i].password === this.state.password) alert("Hello" + users[i].nameUser)
    }
  }
  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          <h4>Se connecter</h4>
          <div className="login-content">
            <div> <input placeholder='Email' onChange={(e) => this.setState({ address: e.target.value })}></input></div>
            <div> <input type="password" placeholder='Mot de passe' onChange={(e) => this.setState({ password: e.target.value })}></input></div>
            <div className="login-access">
              <button onClick={this.props.login(), this.check} className="login-button">Connexion</button>
              <Link to="/forgotpass" className="forgot-password" onClick={this.toggle}>Mot de passe oublié?</Link>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.getUsers
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    login: () => dispatch(login())
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Sign)