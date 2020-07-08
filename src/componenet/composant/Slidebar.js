import React,{useEffect} from "react";
import styled from "styled-components";
import {getsessionstate} from '../../action/useraction'
import { connect } from 'react-redux'
import '../componenet.css'
import { SidebarStyled, SidebarWrapper, Linked, CloseIcon } from './Styledcomponent'
import { NavLink } from 'react-router-dom'


const Sidebar = ({ show, setIsOpened,users,getsessionstate }) => {
    useEffect(() => {
 //getsessionstate()
    }, [])
    return (
        <>
        { localStorage.getItem("role")!="" ?
        <>
        < SidebarStyled show = { show ? 1 : 0 } className="bagroundmenu" >
        <SidebarWrapper>
        <CloseIcon onClick = {
            () => {
                setIsOpened(false);
            }
        } >
        < span/>
        </CloseIcon> 
         <div className = "paddingmenu" > <NavLink to = "/Home" exact activeClassName="active" > < Linked >  👜 &emsp; Derniere Produit</Linked > </NavLink> </div >
        { localStorage.getItem("role")==="admin" ? 
        <div className = "paddingmenu" ><NavLink to = "/User" exact activeClassName="active" > < Linked > < i class = "fa fa-users"
        aria-hidden = "true" > </i> &emsp; Utilisateur</Linked > </NavLink> </div > 
        : null }
        <div className = "paddingmenu" >
        <NavLink to = "/Prodact" exact activeClassName="active" > < Linked > < i class = "fa fa-shopping-bag"aria-hidden = "true" > </i>&emsp;
        Produit </Linked></NavLink >
        </div> <div className = "paddingmenu" >
            { localStorage.getItem("role") ==="admin" ? 
        <a href = "/Historique" exact activeClassName="active" > < Linked > < i class = "fa fa-history"aria-hidden = "true" > </i>&emsp;Historique </Linked></a > : null }
        </div>

        </SidebarWrapper> </SidebarStyled>
        </> : null}
        </>
    );
};
const mapStateToProps = (state) => {
    return {
      users:state.users.usersession
    }
  }
export default connect(mapStateToProps,{getsessionstate})(Sidebar) ;