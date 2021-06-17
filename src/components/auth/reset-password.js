import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../../css/auth.scss'

export default class ResetPassword extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: ''
        };
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {

        event.preventDefault();
        const {email} = this.state;
        axios.post("http://127.0.0.1:8000/api/auth/password-reset", {

            "email": email
        })
        .then( response =>  {

            console.log(response)
            if (response.data?.token !== undefined) {           

                console.log('Email sent')
            }
            else {
                
            }             
        })
        .catch( error =>  {
            
            console.log(error.response?.data?.message);
        });
    }


    render() { 

       return(
        <div className="auth-wrapper">
            <form className="auth-form" onSubmit={this.handleSubmit}>
                <input type="email" name="email" onChange={this.handleChange} placeholder="E-mail"/>
                <input type="submit" value="Send email"/>              
            </form>
            <div className="auth-links">
                <Link to="/login">Back</Link>
            </div>        
        </div>
        );
    }
}