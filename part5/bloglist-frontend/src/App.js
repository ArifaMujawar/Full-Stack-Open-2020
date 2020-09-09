import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from './components/Notification';

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");

  const [title,setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    console.log("error message updated");
  }, [errorMessage, status]);

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setStatus("error");
      setErrorMessage("Wrong username or password");
      
      setTimeout(() => {
        setErrorMessage(null);
        setStatus(null);
      }, 5000);
    }
    console.log('loggin in with ', username, password)
  };

  const handleBlogCreation = async(e) => {
   e.preventDefault();
   if(title==='' ||author==='' || url===''){
      setStatus("error");
      setErrorMessage('Fill the form details')
      setTimeout(()=>{
        setErrorMessage(null);
        setStatus(null);
    }, 3000)
   }else {
    const obj= {
      title, author, url
    }
    try{
      const res = await blogService.create(obj)
      console.log('res', res)
      setStatus("success");
      setErrorMessage(`a new blog ${title} by ${author} added`)
      setTimeout(()=>{
        setErrorMessage(null);
        setStatus(null);
      }, 3000)
     
    }catch(e){
      console.log(e)
    }
     
  }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
    // const blogForm = () => (
    //   <form onSubmit={addBlog}>
    //     <input value={} onChange={}/>
    //   </form>
    // )
  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <Notification message={errorMessage} status={status}/>}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={()=> window.localStorage.removeItem('loggedBlogAppUser')}>Logout</button>

          <form onSubmit={handleBlogCreation}>
          title <input type="text"  name="title" value={title} onChange={({target})=>setTitle(target.value)}/>
          author <input type="text"  name="author" value={author} onChange={({target})=>setAuthor(target.value)}/>
          url <input type="text"  name="url" value={url} onChange={({target})=>setUrl(target.value)}/>
          <button type="submit">Create</button>
          </form>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
