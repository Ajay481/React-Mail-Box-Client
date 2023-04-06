import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { loginUsers } from "../store/AuthSlice";

const AuthScreen = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token) {
      history.push("/home");
    }
  }, [auth.token]);

  const switchAuthHandler = () => {
    setIsLogIn((prevState) => !prevState);
  };

  const emailChangeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const confirmPasswordChangeHandler = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let url;
    if (email && password === confirmPassword) {
      if (isLogIn) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlvwm2UFysqlxp549MzHN_mTVXIn57d7s";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlvwm2UFysqlxp549MzHN_mTVXIn57d7s";
      }
      dispatch(loginUsers({ url, email, password }));
    } else if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      alert("Enter All Required Details");
    } else if (email && password !== confirmPassword) {
      alert("Confirm Password Not Matched");
    }
  };

  return (
    <form className="container p-5 my-5 bg-white border border-secondary">
      <h3>{isLogIn ? "Login" : "Sign In"}</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={emailChangeHandler}
          value={email}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={passwordChangeHandler}
          value={password}
          required
        />
      </div>
      <div className="mb-3">
        <label>Confirm Password</label>
        <input
          name="Confirm password"
          type="password"
          className="form-control"
          placeholder="Confirm password"
          onChange={confirmPasswordChangeHandler}
          value={confirmPassword}
          required
        />
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitHandler}
        >
          {isLogIn ? "Login" : "Sign up"}
        </button>
      </div>
      <div className="mt-3 text-center">
        {isLogIn ? (
          <NavLink to="/forgotpassword">Forgot Password</NavLink>
        ) : null}
      </div>
      <div className="d-grid">
        <button className="btn btn-info mt-3" onClick={switchAuthHandler}>
          {isLogIn
            ? "Don't have an account? Sign up"
            : "Have an account? Login"}
        </button>
      </div>
    </form>
  );
};

export default AuthScreen;
