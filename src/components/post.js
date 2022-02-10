import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios/lib/axios';
import {Link} from 'react-router-dom'
import Comments from './comments'
import '../css/post.scss'

export default class Post extends React.Component {
    
    constructor(props) {

        super(props)
        this.state = {
            id: props.match.params.id,
            author: '',

            post: [],
            rating: 0   
        }
    }


    componentDidMount() {

        axios.get(`http://127.0.0.1:8000/api/posts/${this.state.id}`)       
        .then(response => {
            const data = response.data;
            this.setState({post: data});
            this.setState({rating: data.rating});
            

            axios.get(`http://127.0.0.1:8000/api/users/${this.state.post.author}`)
            .then(response => {
                const data = response.data;
                
                this.setState({author: data.login})
                
            })
            .catch(function (error) {
                console.log(error);
            });

            
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleClick = (event) => {
        
        if (event.target.id === 'like' || event.target.id === 'dislike') {

            axios.post(`http://127.0.0.1:8000/api/posts/${this.state.id}/like`, {
                "type": event.target.id
            }, {
                headers: { 
                    'Authorization': `Bearer ` + Cookies.get('token') 
                }
            })
            .then(response => {

                let rating = this.state.rating

                event.target.id === 'like' ? this.setState({rating: rating + 1}) : this.setState({rating: rating - 1});          
            })
            .catch(error =>  {
                console.log(error);
            });
        }
    }



    
    render() { 
         
        return(
            <div className="post-wrapper">
                <div className="post">
                    <h2>{this.state.post.title}</h2>
                    <div className="post-content-wrapper">
                        <div className="post-content">{this.state.post.content}</div>
                        <div className="rating">
                            <button  onClick={this.handleClick}><i id='like' className="fi-rr-caret-up"></i></button>
                            <div>{this.state.rating}</div>
                            <button  onClick={this.handleClick}><i id='dislike' className="fi-rr-caret-down"></i></button>
                        </div> 
                    </div>
                    <div>
                        <div className='post-author'><Link to={'/users/' + this.state.post.author} >Written by {this.state.author}</Link> <span>{this.state.post.created_at?.match(/(\d+-\d+-\d+)./)[1]}</span></div>
                    </div>
                    
                </div>
                
                <Comments id={this.state.id}/>
            </div>
        );
    }
}