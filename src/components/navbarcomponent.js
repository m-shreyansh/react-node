//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar
//this was replaced by new navbar





import React,{Component} from "react";
import {Button} from "@material-ui/core"
import "./navBar.css"
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import {item} from "./side-bar-list"
export default class navbarcomponent extends Component{
    constructor(props){
        super(props);
        this.toggleSideBar=this.toggleSideBar.bind(this)
        this.state={
            sideBarOn:false
        }
    }
    toggleSideBar(){
        if(this.state.sideBarOn){

        document.body.style.backgroundColor = "white";
        }
        else{

            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";          
        }
        this.setState({sideBarOn:!this.state.sideBarOn})
    }


    
render(){
    window.onclick = function(event) {
    }
    let button;
    if(!this.props.username){
        button=  <Button color="inherit" a href="/Login">Login</Button>
    }
    else{
    button=  <Button color="inherit" onClick={this.props.logMeOut} >{this.props.username}</Button>
    }
    return(
        <div>
        <div className={"nav_bar_body"}>
            <Button onClick={this.toggleSideBar}><MenuIcon /></Button>
        <Button   a href="/">Home</Button>
            {button}
            </div>
        <div>
        <nav id="SideBar" className={this.state.sideBarOn? "side_menu_active" : "side_menu_inactive"}>
            <ul className={"list_Class"} onClick={this.toggleSideBar}>
            {item.map((val)=>{return(
            <li><Link to={val.path} className={"meow"}><div className={"icon-class"}>{val.icon}</div><span>{val.title}</span></Link></li>
            )
                }
            )
            }
            </ul>
        </nav>
        </div>
        </div>
    
  

    )
}
}