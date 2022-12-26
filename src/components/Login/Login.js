import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from "../../context/token-context";
import { AuthContext } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setToken } = useContext(TokenContext);
  const { setMe } = useContext(AuthContext);
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loginError, setLoginError] = useState("");

  const handlerEmailValue = (e) => {
    setEmailValue(e.target.value);
    setEmailInvalid(false);
  };

  const handlerPasswordValue = (e) => {
    setPasswordValue(e.target.value);
    setPasswordInvalid(false);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        email: emailValue,
        password: passwordValue,
      })
      .then((data) => {
        if (data.status === 200) {
          setToken(data.data.accessToken);
          setMe(data.data.user);
          navigate("/");
        }
      })
      .catch((err) => {
        setLoginError(err.response.data);
      });
  };

  useEffect(() => {
    const regex = RegExp("^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$");
    if (emailValue.match(regex) && passwordValue.length > 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailValue, passwordValue]);

  return (
    <div className="col-6 mx-auto shadow p-4 mt-5 text-center">
      <h2 className="fs-3">Please fill blanks</h2>
      <p>
        You are not registered? <Link to="/register">register</Link>
      </p>
      <form onSubmit={submitFormHandler}>
        <input
          onChange={handlerEmailValue}
          onBlur={() => {
            const regex = RegExp("^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$");
            if (!emailValue.match(regex)) {
              setEmailInvalid(true);
            }
          }}
          className="form-control mb-3"
          type="email"
          value={emailValue}
          placeholder="Email"
          required
        />
        {emailInvalid && (
          <span className="text-danger text-start d-block">
            Enter valid text
          </span>
        )}
        <input
          onChange={handlerPasswordValue}
          onBlur={() => {
            if (passwordValue.length < 6) {
              setPasswordInvalid(true);
            }
          }}
          className="form-control mb-3"
          value={passwordValue}
          type="password"
          placeholder="Password"
          required
        />
        {passwordInvalid && (
          <span className="text-danger text-start d-block">
            Enter valid text
          </span>
        )}
        {loginError && (
          <span className="d-block text-danger text-start">{loginError}</span>
        )}
        <button
          type="submit"
          className={disabled ? "btn btn-primary disabled" : "btn btn-primary"}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Login;
