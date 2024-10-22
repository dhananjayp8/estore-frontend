import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <>
      {cart?.items?.length == 0 ? (
        <>
          <button
            className="btn btn-warning mx-5 text-center my-5 "
            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            onClick={() => navigate("/")}
          >
            Continue Shopping..!
          </button>
        </>
      ) : (
        <>
          <div className="my-5 text-center">
            <button
              className="btn btn-info mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Total Qty :- {qty}
            </button>
            <button
              className="btn btn-warning mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Total Price :- {price}
            </button>
          </div>
        </>
      )}

      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container bg-dark p-3 my-5 text-center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="cart_desc">
              <h2>{product.title}</h2>
              <h4>Rs. {product.price}</h4>
              <h4>Qty :- {product.qty}</h4>
            </div>
            <div className="cart_action">
              <button
                className="btn btn-warning mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => decreaseQty(product.productId, 1)}
              >
                -
              </button>
              <button
                className="btn btn-info  mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
              >
                +
              </button>
              <button
                className="btn btn-danger  mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  if (confirm("Are you sure  you want to delete this item?")) {
                    removeFromCart(product?.productId);
                  }
                }}
              >
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      {cart?.items?.length > 0 && (
        <>
          <div className="container text-center my-3">
            <button
              className="btn btn-warning mx-3"
              style={{ fontWeight: "bold" }}
              onClick={() => navigate("/shipping")}
            >
              Checkout
            </button>
            <button
              className="btn btn-danger mx-3"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                if (confirm("Are you sure  you want to clear cart?")) {
                  clearCart();
                }
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
