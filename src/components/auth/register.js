import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../../css/auth.scss'

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            name: '',
            email: '',
            password: '',
            repeat_password: '',
            message: '',
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

        const {login, name, email, password, repeat_password} = this.state;

        event.preventDefault();

        axios.post("http://127.0.0.1:8000/api/auth/register", {

            "login": login,
            "name": name,
            "email": email,
            "password": password,
            "repeat_password": repeat_password
        })
        .then( response =>  {

            console.log(response)
            if (response.data?.user !== undefined) {

                this.setState({message: 'Successfull registration'})
                setTimeout(() => {
                    this.props.history.push("/login")
                }, 3000)       
            }          
        })
        .catch( error =>  {
            
            console.log(error.response?.data?.message);
            this.setState({error: error.response?.data?.message})
        });
    }

    render() { 

       return(
        <div className="auth-wrapper">
            <form className="auth-form" onSubmit={this.submit}>
                <input type="text" name="name" placeholder="Name" onChange={this.change}/>
                <input type="text" name="login" placeholder="Login" onChange={this.change}/>
                <input type="email" name="email" placeholder="E-mail" onChange={this.change}/>
                <input type="password" name="password" placeholder="Password" onChange={this.change}/>
                <input type="password" name="repeat_password" placeholder="Repeat Password" onChange={this.change}/>
                <input type="submit" value="Sign up"/>              
            </form>
            <div className="auth-links">
                <Link to="/login">Log in</Link>
            </div>
            <div className="message-wrapper">
                    {this.state.message && (
                        <div className="message success">{this.state.message}</div>
                    )}

                    {this.state.error && (
                        <div className="message error">{this.state.error}</div>
                    )}
            </div>  
            
        </div>
        );
    }
}