import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-5 text-center">
      <h1>Admin Dashboard</h1>
      <div className="d-flex flex-column align-items-center">
        <button
          className="btn btn-primary my-3"
          onClick={() => navigate("/admin/add")}
        >
          Add Product
        </button>
        {/* <button
          className="btn btn-warning my-3"
          onClick={() => navigate("/admin/edit")}
        >
          Edit Product
        </button> */}
        <button
          className="btn btn-success my-3"
          onClick={() => navigate("/admin/adminProducts")}
        >
          All Products
        </button>
        <button
          className="btn btn-info my-3"
          onClick={() => navigate("/admin/allUsers")}
        >
          All Users
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
