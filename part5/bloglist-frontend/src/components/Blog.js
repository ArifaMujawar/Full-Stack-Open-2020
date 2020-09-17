import React, { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",  
    borderWidth: 1,
    marginBottom: 5,
  }
  const onToggle = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    console.log("from likes ", blog)
    const newLikes = blog.likes + 1
    const obj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      id: blog.id,
    }
    console.log("Updated obj looks like ", obj)
    try {
      console.log("id is ", obj.id)
      const res = await blogService.update(obj.id, obj)
      console.log("res of updation ", res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleRemove = async () => {
    try {
      const res = await blogService.remove(blog.id)
      console.log("after del ", res)
    } catch (e) {
      console.log(e)
    }
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}!`)) {
      await blogService.remove(blog)
    }
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
          <p>like {blog.likes}</p>
          <button onClick={handleLike}>like</button>
          <p>{blog.author}</p>

          <button onClick={handleRemove}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
