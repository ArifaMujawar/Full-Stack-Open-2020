import React,{useState, useEffect} from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({setUser,setStatus,setErrorMessage}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          setUser(user);
          blogService.setToken(user.token);
        }
      }, [setUser]);

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('out')
        try {
          console.log('in')
          const user = await loginService.login({
            username,
            password,
          });
          console.log('user created is ', user)
          window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
          blogService.setToken(user.token);
          setUser(user);
          setUsername("");
          setPassword("");
        } catch (e) {
          setStatus("error");
          setErrorMessage("Wrong username or password");
          console.log(e)
          setTimeout(() => {
            setErrorMessage(null);
            setStatus(null);
          }, 5000);
        }
        console.log("loggin in with ", username, password);
      };
    
    
  return (
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
};
export default LoginForm;
