import axios from "axios";
import React, { useRef, useState } from "react";
import Modal from "../Modal/Modal";

const UserCard = ({ item, getPosts }) => {
  const { title, body, id, user_id, firstname, lastname, created_at } = item;
  const [openModal, setOpenModal] = useState(false);

  const titleRef = useRef();
  const bodyRef = useRef();

  const submitFormHandler = (evt) => {
    evt.preventDefault();
    axios
      .put(`http://localhost:8080/posts/${id}`, {
        user_id,
        title: titleRef.current.value,
        body: bodyRef.current.value,
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
          <form onSubmit={submitFormHandler}>
            <input
              className="form-control mb-3"
              ref={titleRef}
              type="text"
              defaultValue={title}
              required
            />
            <textarea
              className="form-control mb-3"
              ref={bodyRef}
              defaultValue={body}
              required
            ></textarea>
            <button className="btn btn-dark">edit</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UserCard;
