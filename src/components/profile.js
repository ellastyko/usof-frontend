import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import axios from 'axios/lib/axios';
import {ReactComponent as ReactLogoPlus} from '../assets/svg/plus.svg';
import {ReactComponent as ReactLogoLogout} from '../assets/svg/logout.svg';
import React from 'react';
import '../css/profile.scss'

export default class Profile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            image: Cookies.get('image')
        }
        this.id = Cookies.get('id')
        this.name = Cookies.get('name')
        this.login = Cookies.get('login')
        this.email = Cookies.get('email')
    }

    handleLogout = () => {
        
        Cookies.remove('token')
        this.props.history.push('/login')
    }

    onLoad = (event) => {
        console.log('loaded')

 
        const file = event.target.files[0]
        var reader = new FileReader();
        reader.onload = function(e) {
            axios.post(`http://127.0.0.1:8000/api/users/avatar`, {
                image: file 
            },{
                headers: { 
                    'Authorization': `Bearer ` + Cookies.get('token'),
                }
            })       
            .then(response => {
                const data = response.data;
                this.image = data
                console.log('success')
            })
            .catch(error => {
                console.log(error);
            })    
        };
        
        reader.readAsArrayBuffer(file)
    }



    render() { 

       return(
           <div className="profile-wrapper">
               <div className="profile">
                    <div className="profile-image">
                        
                        <img src={'http://localhost:8000/avatars/' + this.state.image} alt='avatar'/>
                        <label>Change avatar<input type="file" onChange={this.onLoad}/> <i onClick={this.deleteComment} className="fi-rr-download"></i></label>      
                                
                    </div>
                    <div className="profile-data">
                        <h3>Name:  <span>{this.name}</span></h3>
                        <h3>Login:  <span>{this.login}</span></h3>
                        <h3>Email:  <span>{this.email}</span></h3>
                    </div>
                    <div className="profile-actions">
                        <Link to="/create-post">Create post <ReactLogoPlus/></Link>   
                        <button onClick={this.handleLogout}>Log out <ReactLogoLogout/></button>
                    </div>
               </div>
           </div>
        );
    }
}