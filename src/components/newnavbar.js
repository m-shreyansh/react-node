import React,{useState} from "react";
import {Button} from "@material-ui/core"
import "../style/navbar.css"
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import {item} from "./side-bar-list"
 function Navbarcomponent(props){
    const[sideBarOn,toggleSideBar]=useState(false);
    const[userMenuOn,userMenuToggle]=useState(false);
    function fadebackground(){
        // sideBarOn?document.body.style.backgroundColor = "white":document.body.style.backgroundColor = "rgba(0,0,0,0.4)"
        // sideBarOn?document.getElementById("sidebar").style.opacity=1?document.getElementById("sidebar").style.opacity=1
        if(sideBarOn){
            console.log("m")
            document.body.style.backgroundColor = "white"
            document.getElementById("sidebar").style.opacity=0
            document.getElementById("sidebar").style.pointerEvents="none"
            document.getElementById("sidebar").style.transform = "translate(-180px)"


        }
        else{
            console.log("m")
            document.body.style.backgroundColor = "rgba(0,0,0,0.4)"
            document.getElementById("sidebar").style.opacity=1
            document.getElementById("sidebar").style.pointerEvents="all"
            document.getElementById("sidebar").style.transform = "translate(0px)"

        }
        toggleSideBar(!sideBarOn)

     }
     function hideUserMenu(){
         const block=document.getElementById("userMenu");
         if(userMenuOn){
            block.style.opacity=0;
            block.style.pointerEvents="none"
            userMenuToggle(false)
         }
         else{
            block.style.opacity=1;
            block.style.pointerEvents="all"
            userMenuToggle(true)
         }
     }
     let button;
     if(!props.username){
         button=  <Button className="account-button" color="inherit" a href="/Login">Login</Button>
     }
     else{
     button=  <Button className="account-button" color="inherit" onClick={()=>hideUserMenu()} >{props.username}</Button>
     }
     window.onclick = function(event) {
         const tempButton=document.getElementById("SideBarButton")
        if(event.target&&event.target.parentNode){
         const parentDiv = event.target.parentNode.parentNode;

         if(tempButton===event.target||tempButton===parentDiv){
            fadebackground()
         }
         else if (sideBarOn){
            fadebackground()
         }
        }
    }
    function temp() {
        props.logMeOut();
        hideUserMenu();
    }
     return(
         <div className="navbar">
             <div id="sidebar" className="sidebar">
        <ul className="sidebar-list" onClick={()=>fadebackground()}>
            {item.map((val)=>{return(
            <Link className="sidebar-list-item" to={val.path} ><li >{val.icon}{val.title}</li></Link>
            )
                }
            )
            }
            </ul>
        </div>
        <div className="titlebar">
        <Button id="SideBarButton" ><MenuIcon/></Button>
        <Button   a href="/" >Home</Button>
        <div className="account-info">   
        {button}
                 <div >
        <ul id="userMenu" className={"userbar"} >
            <Link to={`/profile/`+props.username} onClick={()=>hideUserMenu()}><li className={"profile-button"}>Profile</li></Link>
            <Link to="/" onClick={()=>temp()}><li >Logout</li></Link>
        </ul>
        </div></div>
            
        </div>
        


        </div>
     )
 }
 export default Navbarcomponent