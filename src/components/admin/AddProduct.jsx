// import React, { useContext, useState } from "react";
// import AppContext from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const AddProduct = () => {
//   const { addProudutct } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [productData, setproductData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//     imgSrc: "",
//     qty: "",
//   });

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setproductData({ ...productData, [name]: value });
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     if (
//       productData.category == "--Select Category--" ||
//       productData.category == ""
//     ) {
//       alert("Please Select Category");
//     } else {
//       const { title, description, price, category, imgSrc, qty } = productData;
//       const result = await addProudutct(
//         title,
//         description,
//         price,
//         imgSrc,
//         category,
//         qty
//       );
//       // alert(result.message)

//       setTimeout(() => {
//         navigate("/admin");
//       }, 2000);

//       console.log("data added = ", result);
//     }
//   };

//   return (
//     <>
//       <div
//         className="container my-5 p-4"
//         style={{
//           width: "580px",
//           border: "1px solid yellow",
//           borderRadius: "10px",
//         }}
//       >
//         <h1 className="text-center">Add Product</h1>
//         <form onSubmit={onSubmitHandler}>
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               Title
//             </label>
//             <input
//               name="title"
//               value={productData.title}
//               onChange={onChangeHandler}
//               type="text"
//               className="form-control bg-dark text-light"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputPassword1" className="form-label">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={productData.description}
//               onChange={onChangeHandler}
//               type="text"
//               className="form-control bg-dark text-light"
//               id="exampleInputPassword1"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               price
//             </label>
//             <input
//               name="price"
//               value={productData.price}
//               onChange={onChangeHandler}
//               type="number"
//               className="form-control bg-dark text-light"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Category</label>
//             <select
//               className="form-select bg-dark text-light"
//               name="category"
//               value={productData.category}
//               onChange={onChangeHandler}
//               required
//             >
//               <option>--Select Category--</option>
//               <option>Mobiles</option>
//               <option>Laptops</option>
//               <option>Tablets</option>
//               <option>Cameras</option>
//               <option>Headphones</option>
//             </select>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               imgUrl
//             </label>
//             <input
//               name="imgSrc"
//               value={productData.imgSrc}
//               onChange={onChangeHandler}
//               type="text"
//               className="form-control bg-dark text-light"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">
//               product quantity
//             </label>
//             <input
//               name="qty"
//               value={productData.qty}
//               onChange={onChangeHandler}
//               type="number"
//               className="form-control bg-dark text-light"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               required
//             />
//           </div>
//           <div className="d-grid col-6 my-5 mx-auto">
//             <button type="submit" className="btn btn-primary">
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddProduct;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import AppContext from "../../context/AppContext";

const AddProduct = () => {
  const { addProduct } = useContext(AppContext); // Corrected method spelling
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imgSrc: "",
    qty: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      productData.category === "--Select Category--" ||
      productData.category === ""
    ) {
      toast.error("Please select a valid category", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const { title, description, price, category, imgSrc, qty } = productData;
      //   const productToAdd = {
      //     title: String(title), // Cast to string (redundant, but safe)
      //     description: String(description),
      //     price: Number(price), // Cast to number
      //     category: String(category),
      //     imgSrc: String(imgSrc),
      //     qty: Number(qty), // Cast to number
      //   };
      //   title: { type: String, require: true },
      //   description: { type: String, require: true },
      //   price: { type: Number, require: true },
      //   category: { type: String, require: true },
      //   qty: { type: Number, require: true },
      //   imgSrc: { type: String, require: true },
      //   const result = await addProduct(productToAdd);
      const result = await addProduct(
        title,
        description,
        price,
        imgSrc,
        category,
        qty
      );
      console.log("result is :", result);
      //   if (result.success) {
      //     toast.success("Product added successfully!", {
      //       position: "top-right",
      //       autoClose: 3000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });

      //     setTimeout(() => {
      //       navigate("/admin"); // Navigate back to admin dashboard after adding product
      //     }, 3000);
      //   } else {
      //     toast.error("Failed to add product. Please try again.", {
      //       position: "top-right",
      //       autoClose: 3000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //   }
      navigate("/admin");
    }
  };

  return (
    <>
      <div
        className="container my-5 p-4"
        style={{
          width: "580px",
          border: "1px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">Add Product</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={productData.title}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="description"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              name="price"
              value={productData.price}
              onChange={onChangeHandler}
              type="number"
              className="form-control bg-dark text-light"
              id="price"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select bg-dark text-light"
              name="category"
              value={productData.category}
              onChange={onChangeHandler}
              required
            >
              <option>--Select Category--</option>
              <option>Mobiles</option>
              <option>Laptops</option>
              <option>Tablets</option>
              <option>Cameras</option>
              <option>Headphones</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="imgSrc" className="form-label">
              Image URL
            </label>
            <input
              name="imgSrc"
              value={productData.imgSrc}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="imgSrc"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qty" className="form-label">
              Quantity
            </label>
            <input
              name="qty"
              value={productData.qty}
              onChange={onChangeHandler}
              type="number"
              className="form-control bg-dark text-light"
              id="qty"
              required
            />
          </div>
          <div className="d-grid col-6 my-5 mx-auto">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>

        {/* Add ToastContainer for rendering toast messages */}
        {/* <ToastContainer /> */}
      </div>
    </>
  );
};

export default AddProduct;
