import React,{useEffect} from "react";
import styled from "styled-components";
import { connect } from 'react-redux'
import logo from  './assest/logo_lital.png'
import {getsessionstate,updatesessiondate} from '../../action/useraction'
import { NavLink } from "react-router-dom";
const NavWrapper = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  height: 75px;
  padding: 0 1rem;
  background-color: #f5f4f3;
  z-index : 10;
  border-bottom: 4px solid #dad5d2;

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
    let x =["","","","","","",""]
    props.updatesessiondate(x)
    alert('à bientôt' )

  
   
   
    
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
      <img src={logo} alt="logo" width="100px"></img>
      <div width ="300px">
      <NavLink to ='/'> <p style={{color:"#333"}}>{props.users[4] ? <img className='image' src={props.users[4] } alt="imageuser" width="60px "/> : null }  {props.users[0] + " " + props.users[1]  } <button class="ui brown button" onClick={logout}>Log out</button></p>  </NavLink>
      </div>
    </NavWrapper>
  );
};
const mapStateToProps = (state) => ({
  users: state.users.usersession
});
export default connect(mapStateToProps,{getsessionstate,updatesessiondate})(Navbar);

