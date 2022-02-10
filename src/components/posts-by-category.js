import React from 'react';
import axios from 'axios/lib/axios';
import {Link} from 'react-router-dom'
import {ReactComponent as ReactLogoPlus} from '../assets/svg/plus.svg';
import '../css/posts.scss'

export default class PostsByCategory extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            category: props.match.params.id,
            data: []
        }

    }


    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/categories/${this.state.category}/posts`)
        .then(response => {
            const data = response.data;
            this.setState({data: data})
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    
    render() { 
         
        return(
            <div className="posts-wrapper">
                <div className="posts">
                <Link to="/create-post">Create post  <ReactLogoPlus/></Link>
                {   
                    
                    this.state.data.map((post) => { 
                        return (
                            
                            <Link to={"/posts/" + post.id} key={post.id} className="post">
                                <div className="post-title">
                                    {post.title}
                                </div>
                                <div className="post-content">                              
                                    {
                                        // ((post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g )[0].length + post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g )[1].length) > 245) 
                                        //     ? post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g ).slice(0, 1).join(' ')
                                        //     : post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g ).slice(0, 2).join(' ')
                                    }
                                </div>
                            </Link>
                        );
                    })
                }
                </div>     
            </div>
        );
    }
}