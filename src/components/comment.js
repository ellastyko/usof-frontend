import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios/lib/axios';

export default class Comment extends React.Component  {
    
    constructor(props) {
        super(props)
        this.state = {
            data: props.comment,
            rating: props.comment.rating != undefined ? props.comment.rating : 0,
            user: [],
            deleted: false
        }
    }

    componentDidMount = () => {
        axios.get(`http://127.0.0.1:8000/api/users/${this.state.data.author}`)
        .then(response => {
            const data = response.data;
            // console.log(data)
            this.setState({user: data})
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleClick = (event) => {
        if (event.target.id == 'like' || event.target.id == 'dislike') {

            axios.post(`http://127.0.0.1:8000/api/comments/${this.state.data.id}/like`, {
                "type": event.target.id
            },
            {
                headers: { 
                    'Authorization': `Bearer ` + Cookies.get('token') 
                }
            })
            .then(response => {
                console.log(response)
                const data = response.data;
                let rating = this.state.rating
                console.log(rating)
                event.target.id == 'like' ? this.setState({rating: rating+1}) : this.setState({rating: rating-1});
            })
            .catch(error =>  {
                console.log(error);
            });
        }
    
    
    }

    deleteComment = () => {
        axios.delete(`http://127.0.0.1:8000/api/comments/${this.state.data.id}`, 
        {
            headers: { 
                'Authorization': `Bearer ` + Cookies.get('token') 
            }
        })
        .then(response => {
            console.log(response)
            this.setState({deleted: true})
        })
        .catch(error =>  {
            console.log(error);
        });
    }

    render() { 
        
        return (
            <> { this.state.deleted == false &&
                (<div className="comment">
                    <div className="comment-data-wrapper">
                        <div className="comment-header">
                            
                            <h3 className="name">{this.state.user.login}</h3>
                            
                            <p className="date">{this.state.data.created_at?.match(/(\d+-\d+-\d+)./)[1]}</p>
                            {this.state.user.login === Cookies.get('login') && <button className="delete" onClick={this.deleteComment}><i className="fi-rr-cross-small"/></button>}
                        </div>
                        <div className="comment-content">
                            <div className="text-content">{this.state.data.content}</div>    
                        </div>
                    
                    </div>   
                    <div className="rating">
                            <button  onClick={this.handleClick}><i id='like' className="fi-rr-caret-up"/></button>
                            <div>{this.state.rating}</div>
                            <button  onClick={this.handleClick}><i id='dislike' className="fi-rr-caret-down"/></button>
                    </div>  
                </div>  )
            }
            </>   
        );
    }
}
