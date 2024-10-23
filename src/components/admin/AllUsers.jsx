import React, { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
const AllUsers = () => {
  const { allUsers } = useContext(AppContext);
  const navigate = useNavigate();
  //   useEffect(() => {
  //     console.log("All User from context:", allUsers);
  //   }, [allUsers]);
  //   console.log("All User", allUsers);
  return (
    <>
      <div className="container my-5 text-center">
        <button className="btn btn-warning" style={{ fontWeight: "bold" }}>
          Register User = {allUsers?.length}
        </button>
        <button
          className="btn btn-primary"
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => navigate("/admin")}
        >
          Back
        </button>
        {allUsers?.map((user) => (
          <div key={user._id} className="bg-dark p-2 my-4">
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            <p>{user.createdAt}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllUsers;
