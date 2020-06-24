import React,{useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {getsessionstate} from './action/useraction'
//componenet
import {Dashbord} from './componenet'
import {User} from './componenet'
import {Adduser} from './componenet'
import {Updateuser }from './componenet'
import Allproduct from './componenet/prodact/allproduct'
import {Addprodact} from './componenet'
import {Updateprodact} from './componenet'
import {Historiquecontainer} from './componenet'
import {Comentaire} from './componenet'
import { Footer } from    './componenet/composant'
import { Sign } from    './componenet'
import {Forgotpass} from './componenet'
function App(props) {
useEffect(() => {
  props.getsessionstate()
}, [])
  return (
 
    <div>
    <Router>
    <Switch>
    <Route exact path="/"><Sign/></Route>
    <Route exact path="/forgotpass"><Forgotpass/></Route>
      <Route exact path="/home">  <Dashbord/></Route>
      <Route exact path="/Prodact"><Allproduct/></Route>
      <Route exact path="/update-produit"><Updateprodact/></Route>
      <Route exact path="/Addprodact"><Addprodact/></Route>
      <Route exact path="/comentaire"><Comentaire/></Route>
 
     
     
     
     
    
      {(props.users === []) ?   <Redirect to="/"/> :
      (props.users[5] === "admin") ? <>
      <Route exact path="/user"><User/></Route>
      <Route exact path="/update-user"><Updateuser/></Route>
      <Route exact path="/Adduser"><Adduser/></Route>
      <Route exact path="/Historique"> <Historiquecontainer/>  </Route> 
    
      </> : null  }
    </Switch>

      </Router>
<Footer/>

    </div>

  )
}
const mapStateToProps = (state) => ({
  users: state.users.usersession
});
const mapDispatchtoProps = (dispatch) => ({
  getsessionstate : () => dispatch(getsessionstate())


  })
export default connect(mapStateToProps,mapDispatchtoProps)(App)