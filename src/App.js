import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getsessionstate } from './action/useraction'
//componenet
import { Dashbord } from './componenet'
import { User } from './componenet'
import { Adduser } from './componenet'
import { Updateuser } from './componenet'
import Allproduct from './componenet/prodact/allproduct'
import { Addprodact } from './componenet'
import { Updateprodact } from './componenet'
import { Historiquecontainer } from './componenet'
import { Comentaire } from './componenet'

import { Sign } from './componenet'
import { Forgotpass } from './componenet'
function App(props) {
  useEffect(() => {
    props.getsessionstate()
  }, [])
  useEffect(() => {

  }, [props.users])
  return (
    <div>
      <Router>
        {console.log("users", props.users.length)}
        <Switch>


         
          <Route exact path="/Home">  <Dashbord /></Route>
          <Route exact path="/Prodact"><Allproduct /></Route>
          <Route exact path="/update-produit"><Updateprodact /></Route>
          <Route exact path="/Addprodact"><Addprodact /></Route>
          <Route exact path="/comentaire"><Comentaire /></Route>
          <Route exact path="/User"><User /></Route>
          <Route exact path="/update-user"><Updateuser /></Route>
          <Route exact path="/Adduser"><Adduser /></Route>
          <Route exact path="/Historique"> <Historiquecontainer /> </Route> 
          <Route exact path="/"><Sign /></Route>
          <Route exact path="/forgotpass"><Forgotpass /></Route>
         {/* <Redirect to="/" /> */}


        </Switch>

      </Router>
      <span classname="margintop"></span>


    </div>

  )
}
const mapStateToProps = (state) => ({
  users: state.users.usersession
});
const mapDispatchtoProps = (dispatch) => ({
  getsessionstate: () => dispatch(getsessionstate())


})
export default connect(mapStateToProps, mapDispatchtoProps)(App)