import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import Modal from "../Modal/Modal";
import axios from "axios";
import UserCard from "../UserCard/UserCard";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const date = new Date();

const Settings = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { me } = useContext(AuthContext);
  const [addModal, setAddModal] = useState(false);
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();

  const initialValue = {
    title: "",
    body: "",
  };

  const validate = Yup.object({
    title: Yup.string().min(5, "Min 5 digit").required("Required"),
    body: Yup.string().min(15, "Min 15 digit").required("Required"),
  });

  const formSubmitHandler = (value) => {
    axios
      .post("http://localhost:8080/posts", {
        user_id: me.id,
        title: value.title,
        body: value.body,
        user_name: me.firstname + " " + me.lastname,
        created_at: day + " " + time,
      })
      .then((data) => {
        if (data.status === 201) {
          getPosts();
          setAddModal(false);
        }
      });
  };

  const getPosts = async () => {
    const data = await axios.get(
      `http://localhost:8080/posts?user_id=${me.id}`,
    );

    if (data.status === 200) {
      setUserPosts(data.data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container">
      <h3 className="text-center my-3">Settings</h3>
      <button className="btn btn-success" onClick={() => setAddModal(true)}>
        Add modal +
      </button>
      <h4 className="fs-4 my-4">My Posts</h4>
      {userPosts.length ? (
        <ul className="list-unstyled">
          {userPosts.map((item) => (
            <UserCard key={item.id} item={item} getPosts={getPosts} />
          ))}
        </ul>
      ) : (
        <p className="fs-1 text-center">You don't have any posts</p>
      )}
      {addModal && (
        <Modal setAddModal={setAddModal} title="Add Posts">
          <Formik
            onSubmit={formSubmitHandler}
            initialValues={initialValue}
            validationSchema={validate}
          >
            {(formik) => {
              return (
                <Form>
                  <Field
                    className="form-control mb-2"
                    type="text"
                    name="title"
                    placeholder="Post title"
                    required
                  />
                  <ErrorMessage
                    className="text-left text-danger"
                    component={"div"}
                    name="title"
                  />
                  <Field
                    className="form-control mb-2"
                    name="body"
                    as="textarea"
                    placeholder="Post body"
                    required
                  />
                  <ErrorMessage
                    className="text-left text-danger"
                    component={"div"}
                    name="body"
                  />
                  <button
                    className="btn btn-dark"
                    type="submit"
                    disabled={!formik.dirty || !formik.isValid}
                  >
                    submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </Modal>
      )}
    </div>
  );
};

export default Settings;
