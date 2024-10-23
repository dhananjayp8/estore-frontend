import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AdminProduct = () => {
  const { products, deleteProduct } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        {/* {products?.map((product) => (
          <div key={product._id}>
            <div
              className="container bg-dark my-5 p-3 admin text-center"
              style={{ borderRadius: "10px" }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={product.imgSrc}
                  alt="..."
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                  }}
                />
              </div>
              <div style={{ width: "500px" }}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <span>{product.createdAt}</span>
              </div>
              <div>
                <button
                  className="btn btn-warning mx-3"
                  onClick={() => navigate(`/admin/edit/${product._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    if (confirm("Are you sure, want to delete")) {
                      const result = await deleteProduct(product._id);
                      console.log("deleted Result ", result);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))} */}
        <div className="row justify-content-center">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 my-3 d-flex justify-content-center"
            >
              <div
                className="card bg-dark text-light text-center"
                style={{ width: "18rem" }}
              >
                {/* Product Link */}
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center p-3"
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}
                  />
                </Link>

                {/* Card Body */}
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <div className="my-3 d-flex justify-content-around">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/admin/edit/${product._id}`)}
                    >
                      {/* Rs. {product.price} */}
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={async () => {
                        if (confirm("Are you sure, want to delete")) {
                          const result = await deleteProduct(product._id);
                          console.log("deleted Result ", result);
                        }
                      }}
                    >
                      {/* Add to Cart */}
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
