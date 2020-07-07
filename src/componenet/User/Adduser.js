import React, { useState, useRef } from 'react'
import { connect } from "react-redux";
import swal from 'sweetalert';
/* componenet */
import { Adduser } from '../../action/useraction'
import { Navbar } from "../composant";
import { Background } from "../composant";
import { Sidebar } from "../composant";
function AddUsers(props) {
  const alertref = useRef("none")
  const [isOpened, setIsOpened] = useState(false);
  const [statevalue, setstatevalue] = useState({

    name: null,
    lasntname: null,
    email: null,
    password: null,
    ocuperpost: null,
    role: null,
    ocuperpost: null,





  }
  )
  let refinput = {};
  const contenu = useRef()

  function show() {
    if (statevalue.name === null || statevalue.lasntname === null || statevalue.
      email === null || statevalue.password == null || statevalue.ocuperpost === null || statevalue.role === null) {
      alertref.current.style = 'display: block'
      console.log("alert ok",)
    }
    else {
      let x = Object.values(refinput).map(el => el.value)
      console.log(x)
      props.Adduser(x)
      swal({
        title: "ajouter un nouvaux User?",
        text: "voulez vous ajouter un nouveaux User!",
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
        .then((okpressed) => {
          if (okpressed) {
            window.location.reload()

          }
          else {
            contenu.current.innerHTML = "<div><h1> Votre Donner A eté ajouter  avec Succeé vous pouvez consulter votre Liste des users<h1></div>"

          }
        })
    }
  }
   // ajoute des contenus
 const updateField = e => {
  setstatevalue({
    ...statevalue,
    [e.target.name]: e.target.value
  });
};
  return (
    <div>
      <Navbar toggleMenu={setIsOpened} />
      <Background setIsOpened={setIsOpened} show={isOpened} />
      <Sidebar show={isOpened} setIsOpened={setIsOpened} />
      <div className="Content" ref={contenu}>
        <div ref={alertref} class="alert alert-warning alert-dismissible fade show"
          role="alert">
          <strong>notifiaction!</strong> Merci de remplire tous les champs obligatoire
     <span span className="rouge">*</span>
          <button type="button" class="close" data-dismiss="alert" onClick={() =>
            alertref.current.style = 'display:none'} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
       <strong><h1 className="title">Add user</h1></strong> 
        <div className="contenaire centret"><br />
          <div className="ui inverted segment">
            <div className="ui form inverted">
              <div className="three fields">
                <div class="field">
                  <label>First Name   <span className="rouge">*</span>
                  </label>
                  <p><input ref={e => refinput.name = e} type="text" placeholder=" First Name" name="name" required  onChange={updateField}/></p>
                </div>
                <div class="field">
                  <label>Last Name <span className="rouge">*</span></label>
                  <p>  <input ref={e => refinput.LastName = e} type="text" placeholder="Last Name" required name="lasntname"onChange={updateField}  /></p>
                </div>
                <div class="field">
                  <label>Email<span className="rouge">*</span></label>
                  <p> <input ref={e => refinput.Email = e} type="email" name="email" placeholder="Email" required  onChange={updateField}/></p>
                </div>
              </div>
              <div class="two fields">
                <div class="field">
                  <label>Password <span className="rouge">*</span></label>
                  <p> <input ref={e => refinput.pass = e} type="text" name="password" placeholder="Password" required onChange={updateField}/></p>
                </div>
                <div class="field">
                  <label>image </label>
                  <p>  <input ref={e => refinput.image = e} type="text" placeholder="URL IMAGE" onChange={updateField}/></p>
                </div>
              </div>




              <div className="three fields">
                <div class="field">
                  <label>Post ocupee <span className="rouge">*</span> </label>
                  <p> <input ref={e => refinput.Post = e} name="ocuperpost" type="text" placeholder="Post Ocupee" required onChange={updateField} /></p>
                </div>
                <div class="field">
                  <label>Role <span className="rouge">*</span></label>
                  <p>  <select ref={e => refinput.role = e} name="role" onChange={updateField}>
                    <option value="admin">admin</option>
                    <option value="moderateur">Moderateur</option>
                    <option value="Autre">Autre</option>
                  </select></p>
                </div>
              </div>
              <div class="field">
                <br></br>
                 <button className="ui brown button" onClick={() => show()}>Add user</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >

  )
}
const stateup = (state) => ({
  users: state.users

})
export default connect(stateup, { Adduser })(AddUsers);
