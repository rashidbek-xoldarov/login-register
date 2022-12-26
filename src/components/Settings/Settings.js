import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import Modal from "../Modal/Modal";
import axios from "axios";
import UserCard from "../UserCard/UserCard";

const date = new Date();

const Settings = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { me } = useContext(AuthContext);
  const titleRef = useRef();
  const bodyRef = useRef();
  const [addModal, setAddModal] = useState(false);
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    axios
      .post("http://localhost:8080/posts", {
        user_id: me.id,
        title: titleRef.current.value,
        body: bodyRef.current.value,
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
          <form onSubmit={formSubmitHandler}>
            <input
              className="form-control mb-2"
              type="text"
              ref={titleRef}
              placeholder="Post title"
              required
            />
            <textarea
              className="form-control mb-2"
              ref={bodyRef}
              placeholder="Post body"
              required
            ></textarea>
            <button className="btn btn-dark" type="submit">
              submit
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Settings;
