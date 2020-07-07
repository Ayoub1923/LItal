import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getusersFromApi, updatesessiondate } from '../../action/useraction'
import logoacceuil from '../composant/assest/logoacceuil.png'
import './sign.css'
class Sign extends Component {

  state = {
    address: '',
    password: '',
    pass: false
  }
  componentDidMount() {
    this.props.getusersFromApi()
  }
  check = (e) => {
    let id = -1;
    let value = "";
    let users = this.props.users.user;
    if (this.state.address === '' || this.state.password === '') alert("Empty fields")
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === this.state.address && users[i].password === this.state.password) {
        id = i
        console.log(users[i])
        value = Object.values(users[i])
      }
    }
    if (id !== -1) {
      if (users[id].email === this.state.address && users[id].password === this.state.password) {
        this.props.updatesessiondate(value)
        console.log("console.log", value)


      }
    }

    else {
      alert("non pas vrais")
      e.preventDefault()
    }


  }

  render() {
    return (
      <div className="bagroundcolor">
        <div className=" Content  flexevenly" >
          <img src={logoacceuil} className="logoacceuil imgfluid" alt="imagelital"></img>
          <section class="login-block">
            <div className="container">
              <div class="row ">
                <div class="col login-sec">
                  <h1 class="text-center" className='titles'>Lital Login </h1>
                  <form class="login-form">
                    <div class="form-group">
                      <label for="exampleInputEmail1" class="text-uppercase" >Email</label>
                      <input type="email" class="form-control" placeholder="VOTRE EMAIL ICI" onChange={(e) => this.setState({ address: e.target.value })} />

                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1" class="text-uppercase">Mot de passe</label>
                      <div> <p className="dispalyflex"><input type= { this.state.pass ? "text" :"password"  } placeholder='Mot de passe' onChange={(e) => this.setState({
                        password: e.
                          target.value
                      })} class="form-control" placeholder="Votre pass ici"></input> <span className=" 
                      ui submit button 
                      miniwidthbtn 
                      widthw10" onClick={() => this.setState({pass : !this.state.pass})}><center> { this.state.pass ? <i class="eye slash icon"></i>  : <i class="eye icon "></i>}</center></span></p></div>

                    </div>


                    <div class="form-check">
                    <NavLink to="Home"> <button onClick={(e) => this.check(e)} style={{ width: "100%" }}
   className="login-button" class="btn btn-login float-right">Connexion</button></NavLink> 

                      <label class="form-check-label">
                        <NavLink to="/forgotpass" className="forgot-password" onClick={this.toggle}> Oublier mot de passe</NavLink>

                      </label>
                     
                     


                    </div>

                  </form>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    getusersFromApi: () => dispatch(getusersFromApi()),
    updatesessiondate: (x) => dispatch(updatesessiondate(x))
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Sign)