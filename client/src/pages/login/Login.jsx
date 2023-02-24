import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [invalidUser, setInvalidUser] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", {
        username: userRef.current.value,
        password: passRef.current.value,
      });
      !res.data && setInvalidUser(true);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        {invalidUser && (
          <span style={{ color: "red" }}>Invalid username or password</span>
        )}
        <label>Username</label>
        <input
          ref={userRef}
          type="text"
          className="loginInput"
          placeholder="Enter your Username..."
        />
        <label>Password</label>
        <input
          ref={passRef}
          type="password"
          className="loginInput"
          placeholder="Enter your Password ..."
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <Link to={"/register"} className="link">
        <button className="loginRegisterButton">Register</button>
      </Link>
    </div>
  );
}
