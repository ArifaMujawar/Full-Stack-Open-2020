import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";

import blogService from "./services/blogs";

import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");

  const [blogFormVisible, setBlogFormVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [blogs]);

  useEffect(() => {
    console.log("error message updated");
  }, [errorMessage, status]);

  

  const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
  const showWhenVisible = { display: blogFormVisible ? "" : "none" };

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <Notification message={errorMessage} status={status} />}
      {user === null ? (
        <LoginForm
          setUser={setUser}
          setStatus={setStatus}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button
            onClick={() => window.localStorage.removeItem("loggedBlogAppUser")}
          >
            Logout
          </button>
          <div style={hideWhenVisible}>
            {" "}
            <button onClick={() => setBlogFormVisible(true)}>
              Create Blog
            </button>
          </div>
          <div style={showWhenVisible}>
            {
              <BlogForm
                setStatus={setStatus}
                setErrorMessage={setErrorMessage}
              />
            }{" "}
            <button onClick={() => setBlogFormVisible(false)}>cancel</button>
          </div>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
