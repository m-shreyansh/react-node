import React,{Component} from "react"
import { TextField,Button } from '@material-ui/core';
import axios from "axios"

export default class Register extends Component{
    constructor(props){
        super(props)
        this.onChangeUsername=this.onChangeUsername.bind(this)
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeConfirmPassword=this.onChangeConfirmPassword.bind(this);
        this.onClickSubmit=this.onClickSubmit.bind(this);
        this.enableButton=this.enableButton.bind(this);

        this.state={
            username:'',
            email:'',
            password:'',
            confirmPassword:'',
            buttonDisabler:true
        }
    }

    enableButton(){
        if(this.state.email!==''&&this.state.password!==''&&this.state.username!==''&&this.state.confirmPassword!==''){
            this.setState({buttonDisabler:false})
        }
        else{
            this.setState({buttonDisabler:true})
        }
    }

    onChangeUsername(e){
        this.setState({username:e.target.value},()=>this.enableButton())
    }

    onChangePassword(e){
        this.setState({password:e.target.value},()=>this.enableButton())

    }

    onChangeEmail(e){
        this.setState({email:e.target.value},()=>this.enableButton())

    }

    onChangeConfirmPassword(e){
        this.setState({confirmPassword:e.target.value},()=>this.enableButton())
        
    }

    onClickSubmit(e){
        e.preventDefault();
        if(this.state.password!==this.state.confirmPassword){
            alert("Passwords didn't matched")
            return
        }
        const newUser={
            email:this.state.email,
            username :this.state.username,
            password :this.state.password
        }
        axios.post("http://localhost:5000/users/add",newUser)
            .then((res)=>{                window.location.replace("/");        })
            .catch((err)=>console.log("Error: "+ err))
        }
    render(){
        return(
            <div>
                <form >

                <TextField id="email-field" variant="filled" label="Email" value={this.state.email} onChange={this.onChangeEmail}/>
                <TextField id="username-field" variant="filled" label="Username" value={this.state.username} onChange={this.onChangeUsername}/>
                <TextField id="password-field" variant="filled" label="Password" value={this.state.password} onChange={this.onChangePassword}/>
                <TextField id="conform-password-field" variant="filled" label="Confirm-Password" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword}/>
                <Button id="submit-button" variant="contained" color="primary" type="submit" onClick={this.onClickSubmit} disabled={this.state.buttonDisabler}>REGISTER</Button>
            
                </form>
            </div>
        )
    }
}