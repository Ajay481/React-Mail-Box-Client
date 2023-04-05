import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUsers } from "../store/AuthSlice";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

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
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlvwm2UFysqlxp549MzHN_mTVXIn57d7s";
    dispatch(loginUsers({ url, email, password }));
  };

  return (
    <form className="container p-5 my-5 bg-white border border-secondary">
      <h3>Sign In</h3>
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
          Submit
        </button>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-info mt-3">
          Have an account? Login
        </button>
      </div>
    </form>
  );
};

export default SignUpScreen;
