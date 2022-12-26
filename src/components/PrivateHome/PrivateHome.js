import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const PrivateHome = () => {
  const { me } = useContext(AuthContext);
  console.log(me);

  return (
    <div className="container mx-auto">
      <h2 className="text-center mt-4">
        Good Morning Dear{" "}
        <strong className="text-info">
          {me.firstname + " " + me.lastname}
        </strong>
      </h2>
      <Link to="/posts" className="btn btn-light">
        Go to posts
      </Link>
    </div>
  );
};

export default PrivateHome;
