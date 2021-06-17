import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios/lib/axios';
import Comment from './comment'
// import '../css/post.scss'

export default class Comments extends React.Component {
    
    constructor(props) {

        super(props)
        this.state = {
            id: props.id,      
            user_comment: '',  
            comments: Array(),
            likes: []  
        }
    }


    componentDidMount() {

        // GET POST COMMENTS
        axios.get(`http://127.0.0.1:8000/api/posts/${this.state.id}/comments`)       
        .then(response => {
            const data = response.data;
            console.log(data)
            this.setState({comments: data});  
        })
        .catch(function (error) {
            console.log(error);
        });    
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit = (event) => {

        event.preventDefault()
        const {user_comment} = this.state;

        axios.post(`http://127.0.0.1:8000/api/posts/${this.state.id}/comments`, {
            "content": user_comment
        }, {
            headers: { 
                'Authorization': `Bearer ` + Cookies.get('token') 
            }
        })
        .then( response =>  {

            console.log(response)
            if (response.data !== undefined) {
                
                let updated = Array()
                // Old comments
                this.state.comments.forEach((e) => {
                    updated.push(e);
                })
                // New comment
                updated.push(response.data.comment);
                this.setState({comments: updated})
            }         
        })
        .catch( error => {
            console.log(error.response?.data?.message);
        })
    }
    
    render() { 
         
        return(
            <>
                <form className="user-comment" onSubmit={this.handleSubmit}>
                        <h2>Comments</h2>
                        <textarea name="user_comment" onChange={this.handleChange} placeholder="Type a comment..."></textarea>
                        <input type="submit" value='Left comment'/>
                </form>
                <div className="post-comments">
                    {this.state.comments.map(data => {
                        return <Comment  key={data.id} comment={data}/>
                    })}
                    
                </div>
            </>
        );
    }
}