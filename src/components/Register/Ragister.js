import React, { useContext, useRef } from "react";

import axios from "axios";
import { TokenContext } from "../../context/token-context";
import { AuthContext } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

const Ragister = () => {
  const { setToken } = useContext(TokenContext);
  const { setMe } = useContext(AuthContext);
  const navigate = useNavigate();

  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();

  const submitFormHandler = (evt) => {
    evt.preventDefault();
    axios
      .post(" http://localhost:8080/register", {
        email: email.current.value,
        password: password.current.value,
        firstname: firstName.current.value,
        lastname: lastName.current.value,
      })
      .then((data) => {
        if (data.status === 201) {
          setToken(data.data.accessToken);
          setMe(data.data.user);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="col-6 mx-auto shadow p-4 mt-5 text-center">
      <h2 className="fs-3">Please fill blanks</h2>
      <p>
        Already have an account? <Link to="/login">login</Link>
      </p>
      <form onSubmit={submitFormHandler}>
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Fist Name"
          ref={firstName}
          required
        />
        <input
          ref={lastName}
          className="form-control mb-3"
          type="text"
          placeholder="Last Name"
          required
        />
        <input
          ref={email}
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          required
        />
        <input
          ref={password}
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default Ragister;
