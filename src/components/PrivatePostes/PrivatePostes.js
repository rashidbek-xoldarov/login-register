import React, { useEffect, useState } from "react";
import PostsCard from "../PostsCard/PostsCard";
import axios from "axios";
const PrivatePostes = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((data) => {
      if (data.status === 200) {
        setPosts(data.data);
      }
    });
  }, []);

  return (
    <div className="container mx-auto">
      <h3 className="fs-3 text-center my-3">Posts</h3>
      {posts ? (
        <ul className="list-unstyled d-flex">
          {posts.map((item) => (
            <PostsCard key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p className="fs-3 py-4">There is no postes yet</p>
      )}
    </div>
  );
};

export default PrivatePostes;
