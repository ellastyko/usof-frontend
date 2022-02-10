import React from 'react';
import axios from 'axios'
import Cookies from "js-cookie"
import {Link} from 'react-router-dom'
import '../../css/auth.scss'

export default class Login extends React.Component {

    

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',
            error: ''
        };
    
        this.change = this.handleChange.bind(this);
        this.submit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {

        const {login, email, password} = this.state;

        event.preventDefault();

        axios.post("http://127.0.0.1:8000/api/auth/login", {

            "login": login,
            "email": email,
            "password": password
        })
        .then( response =>  {

            console.log(response)
            if (response.data?.token !== undefined) {

                Cookies.set('token', response.data.token)
                Cookies.set('id', response.data.user.id)
                Cookies.set('login', response.data.user.login)
                Cookies.set('name', response.data.user.name)
                Cookies.set('email', response.data.user.email)
                Cookies.set('image', response.data.user.image)
                
                const { history } = this.props;
                history.push("/profile")
            }            
        })
        .catch( error =>  {
            
            console.log(error.response?.data?.message);
            this.setState({error: error.response?.data?.message})
        });
    }

    render() { 

       return(
           <div className="auth-wrapper" >
               <form className="auth-form" onSubmit={this.submit}>
                    <input type="text" placeholder="Login" name="login"  onChange={this.change}/>
                    <input type="email" placeholder="E-mail" name="email" onChange={this.change}/>
                    <input type="password" placeholder="Password" name="password" onChange={this.change}/>                  
                    <input type="submit" value="Log in"/>
               </form>
               <div className="auth-links">
               <Link to="/register">Sign up</Link> | <Link id="reset-password" to="/reset-password" >Reset password</Link>
               </div>
               
                <div className="message-wrapper">
                    {this.state.error && (
                        <div className="message error">{this.state.error}</div>
                    )}
                </div>          
           </div>
        );
    }
}