import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="col-8 mx-auto text-center">
        <h1 className="my-4 fs-1">Tell us about your interest</h1>
        <p className="fs-4">
          It only takes a few minutes to create your own blog.
        </p>
        <Link to="/login" className="btn btn-danger">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Home;
