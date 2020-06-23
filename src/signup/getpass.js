import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
import { login } from '../actions/actions'
import './sign.css'

class GetPassword extends Component {
  state = {
    modal: false,
    forgottenPass: this.props.forgottenPass
  }
  componentDidMount() {
    this.props.login();
  }
  getPass = () => {
    this.state.forgottenPass = this.props.forgottenPass
    if (this.state.forgottenPass === "") alert("Champs vide")
    for (let i = 0; i < this.props.user.length; i++) {
      if (this.state.forgottenPass === this.props.user[i].email) alert(`Votre mot de passe est : ${this.props.user[i].password}`)
    };
  }
  toggle = () => this.setState({ modal: !this.state.modal });
  render() {
    return (
      <div>
        <Button className='recovery-button' color="danger" onClick={this.getPass}>Récupérer</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}  >
          <ModalBody>
            Votre mot de passe a été envoyé sur votre messagerie.
        </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>X</Button>
          </ModalFooter>
        </Modal>
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
export default connect(mapStateToProps, mapDispatchtoProps)(GetPassword)