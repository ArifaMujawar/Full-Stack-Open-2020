import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const onToggle = () => {
    setVisible(!visible);
  };

  const handleLike = () => {

  }

  const handleRemove = () => {

  }
  return (
    <div style={blogStyle}>
      {!visible ? (
        <div>
          {blog.title}
          <button onClick={onToggle}>{visible ? "Hide" : "View"}</button>
        </div>
      ) : (
        <div>
          <p>{blog.title}</p>
          <button onClick={onToggle}>{visible ? "Hide" : "View"}</button>
          <p>{blog.url}</p>
          <p>{blog.author}</p>
          <p>{blog.likes}</p>
          <button onClick={handleLike}>like</button>
          <button onClick={handleRemove}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
