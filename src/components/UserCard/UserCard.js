import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import * as Yup from "yup";

const UserCard = ({ item, getPosts }) => {
  const { title, body, id, user_id, firstname, lastname, created_at } = item;
  const [openModal, setOpenModal] = useState(false);

  const initialValue = {
    title,
    body,
  };

  const submitFormHandler = (value) => {
    axios
      .put(`http://localhost:8080/posts/${id}`, {
        user_id,
        title: value.title,
        body: value.body,
        user_name: firstname + " " + lastname,
        created_at,
      })
      .then((data) => {
        if (data.status === 200) {
          getPosts();
          setOpenModal(false);
        }
      });
  };

  const validate = Yup.object({
    title: Yup.string().min(4, "At least should be 4").required("Required"),
    body: Yup.string().min(20, "Atleast 20 digit").required("Required"),
  });

  const deletePost = (evt) => {
    axios.delete(`http://localhost:8080/posts/${id}`).then((data) => {
      if (data.status === 200) {
        getPosts();
      }
    });
  };

  return (
    <>
      <li className="d-flex align-items-center justify-content-between bg-light p-3 mb-3">
        <strong>{title}</strong>
        <div>
          <button
            className="btn btn-outline-success"
            onClick={() => setOpenModal(true)}
          >
            Edit
          </button>
          <button className="btn btn-outline-primary ms-3" onClick={deletePost}>
            Delete
          </button>
        </div>
      </li>
      {openModal && (
        <Modal title="Edit post" setAddModal={setOpenModal}>
          <Formik
            onSubmit={submitFormHandler}
            initialValues={initialValue}
            validationSchema={validate}
          >
            {(formik) => {
              return (
                <Form>
                  <Field
                    className="form-control mb-3"
                    name="title"
                    type="text"
                    required
                  />
                  <ErrorMessage
                    className="text-start text-danger"
                    name="title"
                    component={"div"}
                  />
                  <Field
                    className="form-control mb-3"
                    component="textarea"
                    name="body"
                    required
                  />
                  <ErrorMessage
                    className="text-start text-danger"
                    name="body"
                    component={"div"}
                  />
                  <button className="btn btn-dark" type="submit">
                    edit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </Modal>
      )}
    </>
  );
};

export default UserCard;
