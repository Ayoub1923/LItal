import React,{useEffect} from "react";
import styled from "styled-components";
import { connect } from 'react-redux'
import logo from  './assest/logo_lital.png'
import {getsessionstate} from '../../action/useraction'
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';
const NavWrapper = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  padding: 0 1rem;
  background-color: #a59891;
  z-index : 10;
`;

const BurgerMenu = styled.div`
  cursor: pointer;
  padding: 10px 35px 16px 0px;

  & span,
  & span:before,
  & span:after {
    cursor: pointer;
    border-radius: 1px;
    height: 5px;
    width: 35px;
    background: #333;
    position: absolute;
    display: block;
    content: "";
  }

  & span:before {
    top: -10px;
  }

  & span:after {
    bottom: -10px;
  }
`;

const Navbar = (props) => {
  const logout = () => {
   // let x =["","","","","","",""]
   // props.updatesessiondate(x)
   swal({
    title: "voulez vous quitez",
    text: "voulez vous  log out de l'application",
    icon: "info",
    buttons: true,
    dangerMode: true,
  })
  .then((okpressed) => {
    if (okpressed) {
      window.location.replace("http://localhost:3000");
     localStorage.clear()
    
    }
  }) 
  
  

  
   
   
    
  }
  return (
    <NavWrapper>
      <BurgerMenu
        onClick={() => {
          props.toggleMenu(true);
          console.log("Hamburger menu clicked, toggle open");
        }}
      >
        <span />
      </BurgerMenu>
      { localStorage.getItem ("First_name") ? <>
      <img src={logo} alt="logo" width="100px"></img>
      <div width ="300px">
     <p style={{color:"#333"}}>{localStorage.getItem("avatar") ? <img src={localStorage.getItem("avatar")} alt="imageuser" width="60px"/> : null }  {localStorage.getItem("Last_name")  + " " + localStorage.getItem("First_name") }   <button class="ui inverted button" onClick={logout} > Log out </button></p> 
      </div></>: null }
    </NavWrapper>
  );
};
const mapStateToProps = (state) => ({
  users: state.users.usersession
});
export default connect(mapStateToProps,{getsessionstate})(Navbar);

