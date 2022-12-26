import React from "react";
import { Link } from "react-router-dom";

const PostsCard = ({ item }) => {
  const { title, body, id } = item;
  return (
    <div className="card me-2" style={{ width: "250px" }}>
      <div className="card-body">
        <h5 className="card-title fs-4">Author:{title}</h5>
        <p className="card-text">{body}</p>
        <Link to={`/posts/${id}`} className="card-link">
          Lorm More
        </Link>
      </div>
    </div>
  );
};

export default PostsCard;
