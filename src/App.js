
import { Route, Routes, BrowserRouter, } from 'react-router-dom';
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
        <Routes>
          
          <Route exact path='/' element={ <Home/> } />
          
          <Route exact path='/login' element={ <Login/> } />
          <Route exact path='/register' element={ <Register/> } />
          <Route exact path='/reset-password' element={ <ResetPassword/> } />
          <Route exact path='/new-password/:token' element={ <NewPassword/> } />
          
          <Route exact path='/posts' element={ <Posts/> } />
          <Route exact path='/posts/:id' element={ <Post/> } />
          <Route exact path='/create-post' element={ <CreatePost/> } />
          
          <Route exact path='/categories' element={ <Categories/> } />
          <Route exact path='/categories/:id/posts' element={ <PostsByCategory/> } />

          <Route exact path='/users/:id' element={ <User/> } />
          <Route exact path='/profile' element={ <Profile/> } />
          <Route path="*" element={ <NotFound/> } />
        </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;
