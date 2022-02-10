import React from 'react';
import axios from 'axios/lib/axios';
import {Link} from 'react-router-dom'
import Pagination from "react-js-pagination";
import {ReactComponent as ReactLogoPlus} from '../assets/svg/plus.svg';
import '../css/posts.scss'

export default class Posts extends React.Component {
    
    state = { 
        data: [],
        current: 1,
        total: 0, 
        per_page: 0
    }


    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/posts")
        .then(response => {
            const data = response.data;
            this.setState({current: data.current_page})
            this.setState({total: data.total})
            this.setState({per_page: data.per_page})
            this.setState({data: data.data})
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    handlePageChange = (page) => {
        
        axios.get(`http://127.0.0.1:8000/api/posts?page=${page}`)
        .then(response => {
            console.log(response)
            const data = response.data;
            this.setState({current: data.current_page})
            this.setState({total: data.total})
            this.setState({per_page: data.per_page})
            this.setState({data: data.data})
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
                                        ((post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g )[0].length + post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g )[1].length) > 245) 
                                            ? post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g ).slice(0, 1).join(' ')
                                            : post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g ).slice(0, 2).join(' ')
                                    }
                                </div>
                            </Link>
                        );
                    })
                }
                <Pagination className="pagination"
                    activePage={this.state.current}
                    itemsCountPerPage={this.state.per_page}
                    totalItemsCount={this.state.total}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
                </div>     
            </div>
        );
    }
}