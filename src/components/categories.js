import React from 'react';
import {Link} from 'react-router-dom'
import Pagination from "react-js-pagination";
import axios from 'axios/lib/axios';
import '../css/categories.css'

export default class Categories extends React.Component {

    state = { 
        data: [],
        current: 1,
        total: 0, 
        per_page: 0
    }



    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/categories")
        .then(response => {
            const data = response.data;
            console.log(data)
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
        
        axios.get(`http://127.0.0.1:8000/api/categories?page=${page}`)
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
        <div className="categories-wrapper">
            <div className="categories">
            {
                this.state.data.map((category, index) => { 
                    return (
                        <Link to={"/categories/" + category.id + "/posts"} key={category.id} className="category">
                            <div className="category-title">
                                {category.title}
                            </div>
                            <div className="category-content">                              
                                {category.description.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g ).slice(0, 1).join(' ')}
                            </div>
                        </Link>
                    );
                })
            }
            
            </div>    
            <Pagination className="pagination"
                    activePage={this.state.current}
                    itemsCountPerPage={this.state.per_page}
                    totalItemsCount={this.state.total}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
            /> 
        </div>
        );
    }
}