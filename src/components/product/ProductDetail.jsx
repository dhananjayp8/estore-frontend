import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";

const ProductDetail = () => {
  const [product, setProduct] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);
  const url = "https://estore-backend-2.onrender.com/api";
  const { id } = useParams();

  const handleBuyNow = () => {
    if (product) {
      addToCart(product._id, product.title, product.price, 1, product.imgSrc);
      navigate("/cart"); // Redirect to the cart page
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProduct(api.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  return (
    <>
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product?.imgSrc} alt={product?.title} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product?.title}</h1>
          <p className="product-description">{product?.description}</p>
          <h1 className="product-price">Rs. {product?.price}</h1>
          <div className="button-group">
            <button className="btn btn-danger" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className="btn btn-warning">Add To Cart</button>
          </div>
        </div>
      </div>
      <RelatedProduct category={product?.category} />
    </>
  );
};
export default ProductDetail;
