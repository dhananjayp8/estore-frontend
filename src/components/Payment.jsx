// export default Payment;
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

// // Load Stripe with your public key
// const stripePromise = loadStripe(
//   "pk_test_51P67DlSJ0zgqnuATNqgm76vfk1ItcmnAKO6VbPLgaMvETGg5l17FHFsKOk0dSv6mcRsYtanURYHJT8Dac8lFPTud00mfEiu6kc"
// );

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { cart, userAddress, user, url } = useContext(AppContext);
//   const [price, setPrice] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let total = 0;
//     if (cart?.items) {
//       for (let i = 0; i < cart.items.length; i++) {
//         total += cart.items[i].price * cart.items[i].qty;
//       }
//     }
//     setPrice(total);
//   }, [cart]);

//   const handlePayment = async () => {
//     if (!stripe || !elements) return; // Stripe.js has not loaded yet

//     try {
//       const { data } = await axios.post(`${url}/payment/checkout`, {
//         amount: price,
//         cartItems: cart.items,
//         userShipping: userAddress,
//         userId: user._id,
//       });

//       const { clientSecret, orderId } = data;

//       const result = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${window.location.origin}/orderconfirmation/${orderId}`,
//           payment_method_data: {
//             billing_details: {
//               name: user.fullName,
//               email: user.email,
//               address: {
//                 line1: userAddress.address,
//                 postal_code: userAddress.pincode,
//                 city: userAddress.city,
//                 state: userAddress.state,
//                 country: userAddress.country,
//               },
//             },
//           },
//         },
//       });

//       if (result.error) {
//         console.log(result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         console.log("Payment successful!");
//         navigate(`/orderconfirmation/`);
//       }
//     } catch (error) {
//       console.log("Error during payment:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="text-center my-4">Enter Payment Details</h2>
//       <div className="card p-4">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//         <button
//           className="btn btn-primary mt-4"
//           onClick={handlePayment}
//           disabled={!stripe}
//         >
//           Pay
//         </button>
//       </div>
//     </div>
//   );
// };

// const PaymentPage = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//       {/* <PaymentElement /> */}
//     </Elements>
//   );
// };

// export default PaymentPage;

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51P67DlSJ0zgqnuATNqgm76vfk1ItcmnAKO6VbPLgaMvETGg5l17FHFsKOk0dSv6mcRsYtanURYHJT8Dac8lFPTud00mfEiu6kc"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, userAddress, user, url, clearCart } = useContext(AppContext);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        total += cart.items[i].price * cart.items[i].qty;
      }
    }
    setPrice(total);
  }, [cart]);

  const handlePayment = async () => {
    if (!stripe || !elements) return; // Stripe.js has not loaded yet
    console.log("cart Items befor checkout", cart.items);
    try {
      const { data } = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        cartItems: cart.items,
        userShipping: userAddress,
        userId: user._id,
      });
      console.log("Data is :- ", data);
      const { clientSecret, orderId } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: userAddress.fullName,
            email: user.email,
            address: {
              line1: userAddress.address,
              postal_code: userAddress.pincode,
              city: userAddress.city,
              state: userAddress.state,
              country: "IN",
            },
          },
        },
      });
      console.log("result is :-", result);
      if (result.error) {
        console.log(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // await verifyPayment({
        //   orderId,
        //   paymentId: result.paymentIntent.id,
        //   amount: cart.totalPrice,
        //   orderItems: cart.items,
        //   userId: user._id,
        //   userShipping: userAddress,
        // });

        // Clear the cart and navigate to confirmation page
        const paymentData = {
          orderId,
          paymentId: result.paymentIntent.id,
          amount: price, // Send the price or the total amount in subunits
          orderItems: cart.items,
          userId: user._id,
          userShipping: userAddress,
        };

        // Verify payment
        await verifyPayment(paymentData);
        clearCart();
        navigate(`/orderconfirmation`);
      }
    } catch (error) {
      console.log("Error during payment:", error);
    }
  };
  const verifyPayment = async (paymentData) => {
    try {
      const verifyResponse = await axios.post(
        `${url}/payment/verify`,
        paymentData
      );
      console.log("Verify response:", verifyResponse.data); // To check if payment was verified successfully
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Enter Payment Details</h2>
      <p>
        Use 4242 4242 4242 4242 as a card number for testing and any number for
        cvv and zip{" "}
      </p>
      <div className="card p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary mt-4"
          onClick={handlePayment}
          disabled={!stripe}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
