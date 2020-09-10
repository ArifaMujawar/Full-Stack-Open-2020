import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({setStatus, setErrorMessage}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreation = async (e) => {
    e.preventDefault();
    if (title === "" || author === "" || url === "") {
      setStatus("error");
      setErrorMessage("Fill the form details");
      setTimeout(() => {
        setErrorMessage(null);
        setStatus(null);
      }, 3000);
    } else {
      const obj = {
        title,
        author,
        url,
      };
      try {
        const res = await blogService.create(obj);
        console.log("res", res);
        setStatus("success");
        setErrorMessage(`a new blog ${title} by ${author} added`);
        setTimeout(() => {
          setErrorMessage(null);
          setStatus(null);
        }, 3000);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <form onSubmit={handleBlogCreation}>
      <p>title </p>
      <input
        type="text"
        name="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <p>author </p>
      <input
        type="text"
        name="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <p>url </p>
      <input
        type="text"
        name="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};
export default BlogForm;
