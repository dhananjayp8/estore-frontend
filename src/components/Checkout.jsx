// import React, { useContext, useEffect, useState } from "react";
// import AppContext from "../context/AppContext";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import TableProduct from "./TableProduct";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// const Checkout = () => {
//   const { cart, userAddress, url, user } = useContext(AppContext);
//   const [qty, setQty] = useState(0);
//   const [price, setPrice] = useState(0);
//   useEffect(() => {
//     let qty = 0;
//     let price = 0;
//     if (cart?.items) {
//       for (let i = 0; i < cart.items?.length; i++) {
//         qty += cart.items[i].qty;
//         price += cart.items[i].price;
//       }
//     }
//     setPrice(price);
//     setQty(qty);
//   }, [cart]);
//   console.log("cart-items", cart?.items);
//   console.log("user-address", userAddress);
//   console.log("user-id", user._id);
//   console.log("Price", price);
//   const stripePromise = loadStripe(
//     "pk_test_51P67DlSJ0zgqnuATNqgm76vfk1ItcmnAKO6VbPLgaMvETGg5l17FHFsKOk0dSv6mcRsYtanURYHJT8Dac8lFPTud00mfEiu6kc"
//   );
//   // const handlePayment = async () => {
//   //   console.log("Api called");
//   //   try {
//   //     const orderResponse = await axios.post(`${url}/payment/checkout`, {
//   //       amount: price,
//   //       cartItems: cart?.items,
//   //       userShipping: userAddress,
//   //       userId: user._id,
//   //     });

//   //     console.log("order response", orderResponse);
//   //     const orderId = orderResponse.data.orderId;
//   //     const amount = orderResponse.data.amount;
//   //     console.log("Order is ", orderId);
//   //     console.log("Amount is ", amount);
//   //     const paymentIntentClientSecret = data.clientSecret;
//   //     const stripe = await stripePromise;

//   //     const result = await stripe.confirmCardPayment(
//   //       paymentIntentClientSecret,
//   //       {
//   //         payment_method: {
//   //           card: elements.getElement(CardElement), // Assuming you have Stripe Elements set up
//   //           billing_details: {
//   //             name: "Web Dev Mastery",
//   //             email: "webdevmastery@gmail.com",
//   //             address: {
//   //               line1: userShipping.address,
//   //               postal_code: userShipping.pincode,
//   //               city: userShipping.city,
//   //               state: userShipping.state,
//   //               country: userShipping.country,
//   //             },
//   //           },
//   //         },
//   //       }
//   //     );
//   //     if (result.error) {
//   //       // Show error to your customer
//   //       console.log(result.error.message);
//   //     } else {
//   //       // The payment has been processed successfully
//   //       if (result.paymentIntent.status === "succeeded") {
//   //         console.log("Payment successful!");
//   //         clearCart();
//   //         // navigate("/orderconfirmation");
//   //       }
//   //     }
//   //   } catch (err) {
//   //     console.log(err.response ? err.response.data : err.message);
//   //   }
//   // };
//   const stripe = useStripe(); // Hook to get Stripe instance
//   const elements = useElements();

//   const handlePayment = async () => {
//     const stripe = await stripePromise;
//     console.log("Api called");
//     try {
//       // Send a request to your backend to create a payment intent and get the order ID
//       const { data } = await axios.post(`${url}/payment/checkout`, {
//         amount: price,
//         cartItems: cart?.items,
//         userShipping: userAddress,
//         userId: user._id,
//       });

//       const { clientSecret, orderId } = data; // Get clientSecret and orderId from the response

//       // Confirm the payment with the client secret
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement), // Assuming you have Stripe Elements set up
//           billing_details: {
//             name: "Web Dev Mastery",
//             email: "webdevmastery@gmail.com",
//             address: {
//               line1: userAddress.address,
//               postal_code: userAddress.postalCode,
//               city: userAddress.city,
//               state: userAddress.state,
//               country: userAddress.country,
//             },
//           },
//         },
//       });

//       if (result.error) {
//         console.log(result.error.message); // Handle any errors here
//       } else if (result.paymentIntent.status === "succeeded") {
//         console.log("Payment successful!");

//         // Use the orderId for further actions (e.g., storing order in DB or displaying confirmation)
//         console.log("Order ID:", orderId);

//         clearCart(); // Clear the cart on successful payment
//         navigate(`/orderconfirmation/${orderId}`); // Redirect to order confirmation page
//       }
//     } catch (error) {
//       console.log("Error during payment:", error);
//     }
//   };
//   console.log("user address :-", userAddress);
//   return (
//     <>
//       <div className="container my-3">
//         <h1 className="text-center">Order Summary</h1>
//         <table className="table table-bordered border-primary bg-dark">
//           <thead className="bg-dark">
//             <tr>
//               <th scope="col" className="bg-dark text-light text-center">
//                 Product Details
//               </th>

//               <th scope="col" className="bg-dark text-light text-center">
//                 Shipping Address
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-dark">
//             <tr>
//               <td className="bg-dark text-light">
//                 <TableProduct cart={cart} />
//               </td>
//               <td className="bg-dark text-light">
//                 <ul style={{ fontWeight: "bold" }}>
//                   <li>Name :{userAddress?.fullName}</li>
//                   <li>Phone :{userAddress?.phoneNumber}</li>
//                   <li>Country :{userAddress?.country}</li>
//                   <li>State :{userAddress?.state}</li>
//                   <li>PinCode :{userAddress?.pincode}</li>
//                   <li>Near By :{userAddress?.address}</li>
//                 </ul>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <div className="container text-center my-5">
//         <button className="btn btn-secondary btn-lg" onClick={handlePayment}>
//           Proceed to Pay
//         </button>
//       </div>
//     </>
//   );
// };

// export default Checkout;

// import React, { useContext, useEffect, useState } from "react";
// import AppContext from "../context/AppContext";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import TableProduct from "./TableProduct";

// const stripePromise = loadStripe(
//   "pk_test_51P67DlSJ0zgqnuATNqgm76vfk1ItcmnAKO6VbPLgaMvETGg5l17FHFsKOk0dSv6mcRsYtanURYHJT8Dac8lFPTud00mfEiu6kc"
// );

// const CheckoutForm = () => {
//   const { cart, userAddress, url, user } = useContext(AppContext);
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [qty, setQty] = useState(0);
//   const [price, setPrice] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let qty = 0;
//     let price = 0;
//     if (cart?.items) {
//       for (let i = 0; i < cart.items?.length; i++) {
//         qty += cart.items[i].qty;
//         price += cart.items[i].price;
//       }
//     }
//     setPrice(price);
//     setQty(qty);
//   }, [cart]);

//   // const handlePayment = async () => {
//   //   if (!stripe || !elements) {
//   //     return; // Stripe.js has not yet loaded.
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     const { data } = await axios.post(`${url}/payment/checkout`, {
//   //       amount: price,
//   //       cartItems: cart?.items,
//   //       userShipping: userAddress,
//   //       userId: user._id,
//   //     });

//   //     const { clientSecret, orderId } = data;

//   //     const result = await stripe.confirmCardPayment(clientSecret, {
//   //       payment_method: {
//   //         card: elements.getElement(CardElement),
//   //         billing_details: {
//   //           name: user?.fullName || "Guest User",
//   //           email: user?.email || "guest@example.com",
//   //           address: {
//   //             line1: userAddress.address,
//   //             postal_code: userAddress.pincode,
//   //             city: userAddress.city,
//   //             state: userAddress.state,
//   //             country: userAddress.country,
//   //           },
//   //         },
//   //       },
//   //     });

//   //     if (result.error) {
//   //       setError(result.error.message);
//   //     } else if (result.paymentIntent.status === "succeeded") {
//   //       console.log("Payment successful!");

//   //       navigate(`/orderconfirmation/${orderId}`);
//   //     }
//   //   } catch (error) {
//   //     console.log("Error during payment:", error);
//   //     setError("Payment failed. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <>
//       <div className="container my-3">
//         <h1 className="text-center">Order Summary</h1>
//         <table className="table table-bordered border-primary bg-dark">
//           <thead className="bg-dark">
//             <tr>
//               <th scope="col" className="bg-dark text-light text-center">
//                 Product Details
//               </th>
//               <th scope="col" className="bg-dark text-light text-center">
//                 Shipping Address
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-dark">
//             <tr>
//               <td className="bg-dark text-light">
//                 <TableProduct cart={cart} />
//               </td>
//               <td className="bg-dark text-light">
//                 <ul style={{ fontWeight: "bold" }}>
//                   <li>Name: {userAddress?.fullName}</li>
//                   <li>Phone: {userAddress?.phoneNumber}</li>
//                   <li>Country: {userAddress?.country}</li>
//                   <li>State: {userAddress?.state}</li>
//                   <li>PinCode: {userAddress?.pincode}</li>
//                   <li>Address: {userAddress?.address}</li>
//                 </ul>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <div className="container text-center my-5">
//         {/* <CardElement /> */}
//         <button
//           className="btn btn-secondary btn-lg"
//           onClick={handlePayment}
//           // disabled={!stripe || !elements || loading}
//         >
//           {loading ? "Processing..." : "Proceed to Pay"}
//         </button>
//         {error && <div style={{ color: "red" }}>{error}</div>}
//       </div>
//     </>
//   );
// };

// const Checkout = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default Checkout;

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import TableProduct from "./TableProduct";

const Checkout = () => {
  const { cart, userAddress, user } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  // Calculate total price and quantity
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price * cart.items[i].qty;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  // Handle button click to navigate to the payment page
  const handleProceedToBuy = () => {
    navigate("/payment"); // Navigate to the payment page
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>
        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                {/* Render cart items in TableProduct component */}
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name: {userAddress?.fullName}</li>
                  <li>Phone: {userAddress?.phoneNumber}</li>
                  <li>Country: {userAddress?.country}</li>
                  <li>State: {userAddress?.state}</li>
                  <li>PinCode: {userAddress?.pincode}</li>
                  <li>Address: {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        {/* <h2>Total Quantity: {qty}</h2>
        <h2>Total Price: Rs. {price}</h2> */}
        <button
          className="btn btn-secondary btn-lg"
          onClick={handleProceedToBuy}
        >
          Proceed to Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
