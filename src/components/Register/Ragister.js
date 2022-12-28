import React, { useContext, useRef } from "react";

import axios from "axios";
import { TokenContext } from "../../context/token-context";
import { AuthContext } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Ragister = () => {
  const { setToken } = useContext(TokenContext);
  const { setMe } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValue = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const validate = Yup.object({
    firstname: Yup.string().min(4, "At least 4 character").required("Required"),
    lastname: Yup.string().min(4, "At least 4 character").required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().min(4, "At least 4 digit").required("Required"),
  });

  const submitFormHandler = (value) => {
    axios
      .post(" http://localhost:8080/register", value)
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
      <Formik
        onSubmit={submitFormHandler}
        validationSchema={validate}
        initialValues={initialValue}
      >
        {(formik) => {
          return (
            <Form>
              <Field
                className="form-control mb-3"
                type="text"
                name="firstname"
                placeholder="Fist Name"
                required
              />
              <ErrorMessage
                className="text-start text-danger"
                name="firstname"
                component={"div"}
              />
              <Field
                className="form-control mb-3"
                type="text"
                name="lastname"
                placeholder="Last Name"
                required
              />
              <ErrorMessage
                className="text-start text-danger"
                name="lastname"
                component={"div"}
              />
              <Field
                className="form-control mb-3"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <ErrorMessage
                className="text-start text-danger"
                name="email"
                component={"div"}
              />
              <Field
                className="form-control mb-3"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <ErrorMessage
                className="text-start text-danger"
                name="password"
                component={"div"}
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

export default Ragister;
