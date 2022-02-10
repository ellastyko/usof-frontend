import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../../css/auth.scss'

export default class NewPassword extends React.Component {

    

    constructor(props) {
        super(props);
        this.state = {
            token: props.match.params.token,
            password: '',
            error: '',
            message: ''
        };
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {

        const {password} = this.state;
        event.preventDefault();
        console.log(this.state.token)
        axios.post(`http://127.0.0.1:8000/api/auth/password-reset/${this.state.token}`, {

            "password": password
        })
        .then( response =>  {

            console.log(response)
            if (response.data !== undefined) {

                this.setState({message: response.data.message})
                setTimeout(() => {
                    this.props.history.push("/login")
                }, 3000)      
            }
            else {
                
            }             
        })
        .catch( error =>  {
            
            console.log(error.response.data.message);
            this.setState({error: error.response.data.message})
        });
    }

    render() { 

       return(
           <div className="auth-wrapper" >
               <form className="auth-form" onSubmit={this.handleSubmit}>
                    <input type="password" placeholder="Enter new password" name="password" onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
               </form>
                <div className="auth-links">
                    <Link to="/login">back</Link>
                </div>
               

                <div className="message-wrapper">
                    {this.state.error && (
                        <div className="message error">{this.state.error}</div>
                    )}
                    {this.state.message && (
                        <div className="message success">{this.state.message}</div>
                    )}
                </div>          
           </div>
        );
    }
}