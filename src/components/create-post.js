import React from 'react';
import axios from 'axios/lib/axios';
import Cookies from "js-cookie"
import CreatableSelect from 'react-select/creatable';
import '../css/post.scss'

export default class CreatePost extends React.Component {
    
    constructor(props) {
        super(props);
        if (!Cookies.get('token')) 
            this.props.history.push("/login")


        this.state = {
            data: [],
            title: '',
            content: '',
            categories: [],
            error: ''
        };

        this.change = this.handleChange.bind(this);
        this.submit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/categories`)       
        .then(response => {

            let arr = Array()
            response.data.data.forEach(element => {
                arr.push({value: element.id, label: element.title})
            });
            console.log(arr)
            this.setState({data: arr});  
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
        const {title, categories, content} = this.state
        axios.post(`http://127.0.0.1:8000/api/posts`, {
            "title": title,
            "categories": categories,
            "content": content
        }, {
            headers: { 
                'Authorization': `Bearer ` + Cookies.get('token') 
            }
        })
        .then( response =>  {

            console.log(response)
            if (response.data !== undefined) {

                setTimeout(() => {
                    this.props.history.push("/posts")
                }, 3000)      
            }
            else {
                
            }             
        })
        .catch( error => {
            console.log(error.response?.data?.message);
        })
    }


    handleSelect = (newValue, actionMeta) => {
        
        if (actionMeta.action === 'clear') 
            this.setState({categories: [] })
        else if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value') {

            let arr = Array()
            newValue.forEach(elem => {
                arr.push(elem.value)
            })
            this.setState({categories: arr})
        }
        console.groupEnd();
    }
      
    render() { 
         
        return(
            <div className="post-wrapper">             
                <form className="post-create" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Title" name="title"  onChange={this.change}/>
                    <CreatableSelect
                        className="multi-select"
                        isMulti
                        onChange={this.handleSelect}
                        options={this.state.data}
                    />
                    <textarea placeholder="Write a post" name="content" onChange={this.change}/>
                    <button type="submit" >Create post <i className="fi-rr-check"></i></button>
                </form>               
            </div>
        );
    }
}