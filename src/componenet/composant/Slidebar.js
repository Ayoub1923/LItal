import React,{useEffect} from "react";
import styled from "styled-components";
import {getsessionstate} from '../../action/useraction'
import { connect } from 'react-redux'
import '../componenet.css'
import { SidebarStyled, SidebarWrapper, Linked, CloseIcon } from './Styledcomponent'
import { NavLink } from 'react-router-dom'


const Sidebar = ({ show, setIsOpened,users,getsessionstate }) => {
    useEffect(() => {
 getsessionstate()
    }, [])
    return ( < SidebarStyled show = { show ? 1 : 0 } >
        <SidebarWrapper>
        <CloseIcon onClick = {
            () => {
                setIsOpened(false);
                console.log("Close icon clicked, close sidebar");
            }
        } >
        < span/>
        </CloseIcon> <div className = "paddingmenu" >
        <NavLink to = "/Home" > < Linked >  👜 &emsp; Derniere Produit</Linked > </NavLink> </div > 
        {users[5] =="admin" ? 
        <div className = "paddingmenu" ><NavLink to = "/User" > < Linked > < i class = "fa fa-users"
        aria-hidden = "true" > </i> &emsp; User</Linked > </NavLink> </div > 
        : null }
        <div className = "paddingmenu" >
        <NavLink to = "/Prodact" > < Linked > < i class = "fa fa-shopping-bag"aria-hidden = "true" > </i>&emsp;
        Prodact </Linked></NavLink >
        </div> <div className = "paddingmenu" >
            {users[5] =="admin" ? 
        <NavLink to = "/Historique" > < Linked > < i class = "fa fa-history"aria-hidden = "true" > </i>&emsp;Historique </Linked></NavLink > : null }
        </div>

        </SidebarWrapper> </SidebarStyled>
    );
};
const mapStateToProps = (state) => {
    return {
      users:state.users.usersession
    }
  }
export default connect(mapStateToProps,{getsessionstate})(Sidebar) ;