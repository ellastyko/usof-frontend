
import { Route, Switch, BrowserRouter, } from 'react-router-dom';
// style
import './css/app.css'

// components
import Nav from './components/basic/nav'
import Home from './components/basic/home'
import NotFound from './components/basic/notfound'

import NewPassword from './components/auth/new-password'
import Login from './components/auth/login'
import Register from './components/auth/register'
import ResetPassword from './components/auth/reset-password'

import Profile from './components/profile'
import User from './components/user'
import Categories from './components/categories'
import Posts from './components/posts'
import Post from './components/post'
import PostsByCategory from './components/posts-by-category'
import CreatePost from './components/create-post'




function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="main">
        <Switch>
          
          <Route exact path='/' component={ Home } />
          
          <Route exact path='/login' component={ Login } />
          <Route exact path='/register' component={ Register } />
          <Route exact path='/reset-password' component={ ResetPassword } />
          <Route exact path='/new-password/:token' component={ NewPassword } />
          
          <Route exact path='/posts' component={ Posts } />
          <Route exact path='/posts/:id' component={ Post } />
          <Route exact path='/create-post' component={ CreatePost } />
          
          <Route exact path='/categories' component={ Categories } />
          <Route exact path='/categories/:id/posts' component={ PostsByCategory } />

          <Route exact path='/users/:id' component={ User } />
          <Route exact path='/profile' component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>  
    </BrowserRouter>
  );
}

export default App;
