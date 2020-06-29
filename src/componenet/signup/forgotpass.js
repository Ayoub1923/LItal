import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import logoacceuil from '../composant/assest/logoacceuil.png'
import Axios from 'axios';
import './sign.css'
import { getusersFromApi} from '../../action/useraction'
 class Forgotpass extends Component {
  state = {
    forgottenPass: ""
  }
  componentDidMount() {
    this.props.getusersFromApi();
  }

 sendmail = () => {
 console.log(this.props.users)
  let id = -1
  for (let i = 0; i < this.props.users.length; i++) {
    if (this.state.forgottenPass=== this.props.users[i].email)
    id = i;
  }
  if (id !== -1)
  {
   
  let   x = this.props.users[id]
  console.log("valeur de x ",x,x.first_name)
    Axios.post("http://localhost:8000/send",{
 name  : x.first_name,   
 email: x.email,  
 messsage: x.password + " " +x.email
})
 .then (res =>  {
   if (res.data.msg === 'success'){
   alert("Message Sent."); 
}else if(res.data.msg === 'fail'){
   alert("Message failed to send.")
}})
    }
else
{
alert("votre donner n'est pas valide")

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
                <h2 class="text-center">Oublier mon mot de passe</h2>
                <form class="login-form">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-uppercase">Email</label>
                    <input type="email" class="form-control" placeholder="VOTRE EMAIL ICI" onChange={(e) => this.setState({ forgottenPass: e.target.value })}/>
                  </div>
                  <div class="login-form"></div>

                       <div className='forgot-buttons'>
                         <div className="flex">
   <button className='cancel' onClick={this.sendmail}> Envoyer </button>
   <NavLink to="/"><button className='cancel'>Retour</button></NavLink>
   </div>
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
    users:state.users.user
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    getusersFromApi: () => dispatch(getusersFromApi()),

  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Forgotpass)