import React from 'react'
import '../../css/nav.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie';


export default class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: false
        };
    }
    componentDidMount() {
        if (Cookies.get('token')) 
            this.setState({auth: true})
    }

    render() { 

        return(
            <nav>
                <div className="nav-main">
                        <Link to="/">Calypso</Link>               
                </div>
                <div className="nav-buttons">
                        <Link to="/posts">Posts</Link>
                        <Link to="/categories">Categories</Link>              
                        {
                            this.state.auth == true 
                                ? (<Link to="/profile">Profile</Link>)                                  
                                : (<Link to="/login">Log in</Link>)
                        }
                        <div className="burger">
                            <i className={'fas fa-bars'} />
                        </div>
                </div>
            </nav>
            );
    }
}