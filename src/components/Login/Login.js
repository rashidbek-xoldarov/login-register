import React, { useContext } from "react";
import axios from "axios";
import { TokenContext } from "../../context/token-context";
import { AuthContext } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const { setToken } = useContext(TokenContext);
  const { setMe } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    user_email: "",
    user_password: "",
  };

  const submitFormHandler = (value) => {
    axios
      .post("http://localhost:8080/login", {
        email: value.user_email,
        password: value.user_password,
      })
      .then((data) => {
        if (data.status === 200) {
          setToken(data.data.accessToken);
          setMe(data.data.user);
          navigate("/");
        }
      });
  };

  const validation = Yup.object({
    user_email: Yup.string()
      .email("Should be valid email")
      .required("Required"),
    user_password: Yup.string()
      .min(3, "Min 3")
      .max(8, "Max 8")
      .required("Required"),
  });

  return (
    <div className="col-6 mx-auto shadow p-4 mt-5 text-center">
      <h2 className="fs-3">Please fill blanks</h2>
      <p>
        You are not registered? <Link to="/register">register</Link>
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={submitFormHandler}
      >
        {(formik) => {
          return (
            <Form>
              <Field
                className="form-control mb-3"
                type="email"
                name="user_email"
                placeholder="Email"
                required
              />
              <ErrorMessage
                className="text-start text-danger"
                component={"div"}
                name="user_email"
              />
              <Field
                className="form-control mb-3"
                type="password"
                placeholder="Password"
                name="user_password"
                required
              />
              <ErrorMessage
                className="text-start text-danger"
                component={"div"}
                name="user_password"
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
