import React, { useState } from "react";
import ReactDOM from "react-dom";
import Lastprodact from '../prodact/Lastprodact'
import {Navbar, Footer} from "../composant";
import {Background} from "../composant";
import {Sidebar} from "../composant";
import { connect } from 'react-redux'

const  Dashbord = ({users}) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
        { users[6] !="" ? <>
      <Navbar toggleMenu={setIsOpened} />
      <Background setIsOpened={setIsOpened} show={isOpened} />
      <Sidebar show={isOpened} setIsOpened={setIsOpened} />
      <div className="Content">
        <h1 className='title'>Dernière Produit</h1>
 <Lastprodact/>
       
      </div>
     
      </>
      : null }
       <Footer/>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    users:state.users.usersession
  }
}
const mapDispatchtoProps = (dispatch) => {

}
export default connect (mapStateToProps,mapDispatchtoProps)(Dashbord)