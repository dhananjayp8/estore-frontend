// OrderConfirmation.jsx
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";
import { Checkmark } from "react-checkmark";
const OrderConfirmation = () => {
  // const { orderId } = useParams();
  const { userOrder, cart } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});
  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  console.log("latestOrder", latestOrder);

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">
          <span>Your order has been confirm</span> <Checkmark />
        </h1>
        <h3 className="text-center">It will delivered soon</h3>
      </div>

      <div className="container">
        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                OrderItems
              </th>

              <th scope="col" className="bg-dark text-light text-center">
                OrderDetails & ShippingAddress
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                {/* <TableProduct cart={cart} /> */}
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>OrderId : {latestOrder?.orderId}</li>
                  <li>PaymentId : {latestOrder?.paymentId}</li>
                  <li>PaymentStatus : {latestOrder?.payStatus}</li>
                  <li>Name : {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone : {latestOrder?.userShipping?.phoneNumber}</li>
                  <li>Country : {latestOrder?.userShipping?.country}</li>
                  <li>State : {latestOrder?.userShipping?.state}</li>
                  <li>PinCode : {latestOrder?.userShipping?.pincode}</li>
                  <li>Near By : {latestOrder?.userShipping?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderConfirmation;
