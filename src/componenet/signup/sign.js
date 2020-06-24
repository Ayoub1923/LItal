import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getusersFromApi,updatesessiondate } from '../../action/useraction'
import './sign.css'
class Sign extends Component {

  state = {
    address: '',
    password: ''
  }
  componentDidMount(){
    this.props.getusersFromApi()
  }
  check = (e) => {
    let id = -1;
    let value="";
    let users = this.props.users.user;
    if (this.state.address === '' || this.state.password === '') alert("Empty fields")
    for (let i = 0; i < users.length; i++) {
     if ( users[i].email === this.state.address && users[i].password === this.state.password)
     {
     id=i
     console.log(users[i])
     value= Object.values(users[i])
    }
    }
      if (users[id].email === this.state.address && users[id].password === this.state.password)
      { 
         this.props.updatesessiondate(value)
       console.log ("console.log",value)

      }
    
    
      else if  ( users[id].email !== this.state.address || users[id].password !== this.state.password || id == -1) 
         {
          alert("non pas vrais")   
          e.preventDefault()
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
            <NavLink to="/home"><button onClick={(e) => this.check(e)} className="login-button">Connexion</button></NavLink>
              <NavLink to="/forgotpass" className="forgot-password" onClick={this.toggle}>Mot de passe oublié?</NavLink>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
const mapStateToProps = (state) => {
  return {
    users:state.users
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    getusersFromApi: () => dispatch(getusersFromApi()),
    updatesessiondate:(x) => dispatch(updatesessiondate(x))
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Sign)