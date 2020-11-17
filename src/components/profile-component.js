import React,{useState,useEffect} from "react";
import axios from "axios"
import {Button,TextField} from "@material-ui/core"
import "./profile.css"
import DisplayBlog from "./display-blogs";

function Profile(props){
const requiredUser=window.location.href.slice(window.location.href.indexOf("profile")+8)

    const [userDetails,updateDetails]=useState({})
    const [parameter, setparameter] = useState("title")
    function changePass(){
        return(
            <div>
            <TextField  variant="filled" label="Old Password"  />
            <TextField  variant="filled" label="New Password" />
            <TextField  variant="filled" label="Confirm New Password" />
            <Button className="changePass-button">change pass</Button>
            </div>
        )
    }
    useEffect(()=>{
    axios.post("http://localhost:5000/profile/",{requiredUser:requiredUser})
        .then((res)=>{
            updateDetails(res.data)

        })
        .catch((err)=>console.log("Error: "+ err)) ; 

    }
    ,[])

    function userFound(){
        return(
            <div>
  Usernane: {userDetails.username}
            Email: {userDetails.email}
          {props.username===userDetails.username?changePass():""}
            <DisplayBlog requiredUser={requiredUser} parameter={parameter} userviewing={props.username}/>
            </div>
        )
    }

    function userNotFound(){
        return(
            <div>
                No user found
                Check username Again
            </div>
        )
    }
    
    return(
        <div>
            {/* {userDetails.username?<DisplayBlog requiredUser={requiredUser}/>:userNotFound()} */}
            {userDetails.username?userFound():userNotFound()}
            
        </div>
    )
}

export default Profile