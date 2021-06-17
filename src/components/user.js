import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios/lib/axios';
import '../css/profile.scss'


export default class User extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.id,
            post_id: props.post,
            data: []
        }
        console.log(props)
        
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/users/${this.state.id}`)       
        .then(response => {
            const data = response.data;
            this.setState({data: data});  
        })
        .catch(function (error) {
            console.log(error);
        });   
    }


    handleClick = () => this.props.history.goBack();
    

    render() { 

       return(
           <div className="profile-wrapper">
               <div className="profile">
                    <div className="profile-image">
                        
                        { this.state.data.image != null ? (<img src={'http://localhost:8000/avatars/' + this.state.data.image}/>) : (<img src="http://localhost:8000/avatars/default.jpeg"/>) }    
                            
                    </div>
                    <div className="profile-data">
                        <h3>Name:  <span>{this.state.data.name}</span></h3>
                        <h3>Login:  <span>{this.state.data.login}</span></h3>
                        <h3>Rating:  <span>{this.state.data.rating}</span></h3>
                    </div>
                    <div className="profile-actions">
                        <button onClick={this.handleClick}>Back</button>   
                    </div>
               </div>
           </div>
        );
    }
}