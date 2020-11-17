import React,{useState,useEffect} from "react";
import axios from "axios"
import DisplayBlog from "./display-blogs";



function Home(props){



        return(
            <div>
            <DisplayBlog userviewing={props.username}/>

            </div>
        )
}

export default Home