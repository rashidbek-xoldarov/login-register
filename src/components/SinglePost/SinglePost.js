import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SinglePost = () => {
  const [data, setData] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8080/posts/${id}`).then((data) => {
      if (data.status === 200) {
        setData(data.data);
      }
    });
  }, [id]);
  return (
    <div className="col-8 mx-auto">
      <h3 className="fs-2  my-5">Post {id}</h3>
      <h4 className="text-primary text-center">Post title: {data.title}</h4>
      <p className="fs-3 mt-3">Post body: {data.body}</p>
      <Link to="/posts" className="btn btn-outline-danger mt-5 d-block mx-auto">
        All posts
      </Link>
    </div>
  );
};

export default SinglePost;
