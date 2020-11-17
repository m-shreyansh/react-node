import React,{Component} from "react";
import { TextField,Button } from '@material-ui/core';
import axios from 'axios'
import Cookies from "js-cookie"
export default class usercomponent extends Component{

    constructor(props){
        super(props)
        this.onChangeUsername=this.onChangeUsername.bind(this)
        this.onChangePassword=this.onChangePassword.bind(this)
        this.onClickLogin=this.onClickLogin.bind(this)
        // this.componentDidMount=this.componentDidMount.bind(this)
        this.state={
            username:'',
            password:''
        }
    }

    onChangeUsername(e){
        this.setState({username:e.target.value})

    }

    onChangePassword(e){
        this.setState({password:e.target.value})
    }

    onClickLogin(e){
        e.preventDefault()
        const User={
         username:this.state.username,
         password:this.state.password
        }
        async function doWork(){
            try{
                const res=await axios.post("http://localhost:5000/users/login",User)
                const token=res.data.token
                await Cookies.set('user',token)
                window.location.replace("/");
            }
            catch(err){
                console.log("Error: "+ err)
            }
        }
        doWork()
        // axios.post("http://localhost:5000/users/login",User)
        //     .then((res)=>{
        //         console.log(res.data.token)
        //         const token=res.data.token
        //         Cookies.set('user',token)
        //     })
        //     .catch((err)=>console.log("Error: "+ err))
        
            // window.location.replace("/register");
            
    }

        componentWillMount(){
            console.log(this.props.myProp)
        if(this.props.username){
            window.location.replace("/");
        }
      }

    render(){
        return(
            <div>
                <form >
                <TextField id="username-field" variant="filled" label="Username" value={this.state.username} onChange={this.onChangeUsername}/>
                <TextField id="password-field" variant="filled" label="Password" value={this.state.password} onChange={this.onChangePassword}/>
                <Button color="primary" variant="contained" a href="/login" onClick={this.onClickLogin} >Login</Button>
                <Button color="primary" variant="contained" a href="/register">Register</Button>

            
                </form>
            </div>
        )
    }
}