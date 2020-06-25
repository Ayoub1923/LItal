import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {GetPassword} from './getpass'
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
      <div className='login-page'>
        <div className="forgot-pass-box">
          <h5>Entrez votre adresse mail :</h5>
          <input className="forgot-pass-input" onChange={(e) => this.setState({ forgottenPass: e.target.value })
          }></input>
          <div className='forgot-buttons'>

            <button  classname="login-button" onClick={this.sendmail}> envoiyer </button>
            <Link to="/"><button className='cancel'>Retour</button></Link>
          </div>
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