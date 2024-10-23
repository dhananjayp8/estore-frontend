import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchItem, setSearchItem] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // New state for sorting
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setFilteredData,
    products,
    logout,
    isAuthenticated,
    user,
    cart,
    adminLogout,
    isAdminAuthenticated,
  } = useContext(AppContext);

  const filterByCategory = (c) => {
    setFilteredData(
      products.filter((data) => data.category.toLowerCase() === c.toLowerCase())
    );
  };

  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price <= price));
  };

  // New function to handle sorting by price
  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    let sortedProducts = [...products];
    if (order === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredData(sortedProducts);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchItem}`);
    setSearchItem("");
  };

  return (
    <div className="nav sticky-top">
      <div className="nav-bar">
        <Link
          to={"/"}
          className="left"
          style={{ textDecoration: "none", color: "white" }}
        >
          <h1 className="heading">SHOPKART</h1>
        </Link>
        <form className="search-bar" onSubmit={submitHandler}>
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search Products..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </form>
        <div className="right">
          {isAuthenticated && (
            <>
              <Link
                to={"/cart"}
                type="button"
                className="btn btn-primary position-relative"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {cart?.items?.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart?.items?.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </Link>
              <Link to={"/profile"} className="btn btn-primary mx-3">
                {user?.name}
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to={"/login"} className="btn btn-info mx-3">
                login
              </Link>
              <Link to={"/register"} className="btn btn-info mx-3">
                register
              </Link>
            </>
          )}
          {!isAdminAuthenticated ? (
            <Link to={"/admin/login"} className="btn btn-warning mx-3">
              Admin
            </Link>
          ) : (
            <>
              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  adminLogout(); // Admin logout logic
                  navigate("/");
                }}
              >
                Admin Logout
              </button>
            </>
          )}
          {/* {!isAdminAuthenticated ? (
            <li className="nav-item">
              <Link to="/admin/login" className="btn btn-warning mx-3">
                Admin Login
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  adminLogout(); // Admin logout logic
                  navigate("/");
                }}
              >
                Admin Logout
              </button>
            </li>
          )} */}
        </div>
      </div>
      {location.pathname === "/" && (
        <div className="sub-bar">
          <div className="items" onClick={() => setFilteredData(products)}>
            No Filter
          </div>
          <div className="items" onClick={() => filterByCategory("mobiles")}>
            Mobiles
          </div>
          <div className="items" onClick={() => filterByCategory("laptops")}>
            Laptops
          </div>
          <div className="items" onClick={() => filterByCategory("cameras")}>
            Camera
          </div>
          <div className="items" onClick={() => filterByCategory("headphones")}>
            Headphones
          </div>
          <div className="items" onClick={() => filterByPrice(15999)}>
            15999
          </div>
          <div className="items" onClick={() => filterByPrice(25999)}>
            25999
          </div>
          <div className="items" onClick={() => filterByPrice(49999)}>
            49999
          </div>
          <div className="items" onClick={() => filterByPrice(69999)}>
            69999
          </div>
          <div className="items" onClick={() => filterByPrice(89999)}>
            89999
          </div>

          {/* Sorting Dropdown */}
          <select
            className="items"
            value={sortOrder}
            onChange={handleSort}
            style={{
              backgroundColor: "#007bff", // Match navbar color
              color: "white", // Text color
              border: "none", // No border
              padding: "8px 13px", // Padding
              borderRadius: "4px", // Rounded corners
              cursor: "pointer",
              width: "7rem",
              margin: "0 .5rem",
              // Pointer cursor
            }}
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Navbar;
// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import AppContext from "../context/AppContext";

// const Navbar = () => {
//   const [searchItem, setSearchItem] = useState("");
//   const [sortOrder, setSortOrder] = useState(""); // New state for sorting
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Context values
//   const {
//     setFilteredData,
//     products,
//     logout,
//     isAuthenticated,
//     isAdminAuthenticated,
//     user,
//     cart,
//   } = useContext(AppContext);

//   const filterByCategory = (c) => {
//     setFilteredData(
//       products.filter((data) => data.category.toLowerCase() === c.toLowerCase())
//     );
//   };

//   const filterByPrice = (price) => {
//     setFilteredData(products.filter((data) => data.price >= price));
//   };

//   // New function to handle sorting by price
//   const handleSort = (e) => {
//     const order = e.target.value;
//     setSortOrder(order);

//     let sortedProducts = [...products];
//     if (order === "lowToHigh") {
//       sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (order === "highToLow") {
//       sortedProducts.sort((a, b) => b.price - a.price);
//     }
//     setFilteredData(sortedProducts);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     navigate(`/product/search/${searchItem}`);
//     setSearchItem("");
//   };

//   return (
//     <div className="nav sticky-top">
//       <div className="nav-bar">
//         <Link
//           to={"/"}
//           className="left"
//           style={{ textDecoration: "none", color: "white" }}
//         >
//           <h1>SHOPKART</h1>
//         </Link>
//         <form className="search-bar" onSubmit={submitHandler}>
//           <span className="material-symbols-outlined">search</span>
//           <input
//             type="text"
//             placeholder="Search Products..."
//             value={searchItem}
//             onChange={(e) => setSearchItem(e.target.value)}
//           />
//         </form>
//         <div className="right">
//           {isAuthenticated && (
//             <>
//               <Link
//                 to={"/cart"}
//                 type="button"
//                 className="btn btn-primary position-relative"
//               >
//                 <span className="material-symbols-outlined">shopping_cart</span>
//                 {cart?.items?.length > 0 && (
//                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                     {cart?.items?.length}
//                     <span className="visually-hidden">unread messages</span>
//                   </span>
//                 )}
//               </Link>
//               <Link to={"/profile"} className="btn btn-primary mx-3">
//                 {user?.name}
//               </Link>
//               <button
//                 className="btn btn-warning"
//                 onClick={() => {
//                   logout();
//                   navigate("/");
//                 }}
//               >
//                 logout
//               </button>
//             </>
//           )}
//           {!isAuthenticated && (
//             <>
//               <Link to={"/login"} className="btn btn-info mx-3">
//                 login
//               </Link>
//               <Link to={"/register"} className="btn btn-info mx-3">
//                 register
//               </Link>
//             </>
//           )}

//           {/* Admin Links */}
//           {!isAdminAuthenticated ? (
//             <Link to={"/admin/login"} className="btn btn-warning mx-3">
//               Admin
//             </Link>
//           ) : (
//             <>
//               <Link to={"/admin"} className="btn btn-secondary mx-3">
//                 Admin
//               </Link>
//               <button
//                 className="btn btn-danger mx-3"
//                 onClick={() => {
//                   logout(); // Admin logout logic
//                   navigate("/");
//                 }}
//               >
//                 Admin Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Filters & Sorting */}
//       {location.pathname === "/" && (
//         <div className="sub-bar">
//           <div className="items" onClick={() => setFilteredData(products)}>
//             No Filter
//           </div>
//           <div className="items" onClick={() => filterByCategory("mobiles")}>
//             Mobiles
//           </div>
//           <div className="items" onClick={() => filterByCategory("laptops")}>
//             Laptops
//           </div>
//           <div className="items" onClick={() => filterByCategory("camera")}>
//             Camera
//           </div>
//           <div className="items" onClick={() => filterByCategory("headphones")}>
//             Headphones
//           </div>
//           <div className="items" onClick={() => filterByPrice(15999)}>
//             15999
//           </div>
//           <div className="items" onClick={() => filterByPrice(25999)}>
//             25999
//           </div>
//           <div className="items" onClick={() => filterByPrice(49999)}>
//             49999
//           </div>
//           <div className="items" onClick={() => filterByPrice(69999)}>
//             69999
//           </div>
//           <div className="items" onClick={() => filterByPrice(89999)}>
//             89999
//           </div>

//           {/* Sorting Dropdown */}
//           <select
//             className="items"
//             value={sortOrder}
//             onChange={handleSort}
//             style={{
//               backgroundColor: "#007bff",
//               color: "white",
//               border: "none",
//               padding: "8px 13px",
//               borderRadius: "4px",
//               cursor: "pointer",
//               width: "7rem",
//               margin: "0 .5rem",
//             }}
//           >
//             <option value="">Sort by</option>
//             <option value="lowToHigh">Price: Low to High</option>
//             <option value="highToLow">Price: High to Low</option>
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

// import React, { useContext, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import AppContext from "../context/AppContext";

// const Navbar = () => {
//   const [searchItem, setSearchItem] = useState("");
//   const [sortOrder, setSortOrder] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const {
//     setFilteredData,
//     products,
//     logout,
//     isAuthenticated,
//     isAdminAuthenticated,
//     user,
//     cart,
//     adminLogout,
//   } = useContext(AppContext);

//   const filterByCategory = (c) => {
//     setFilteredData(
//       products.filter((data) => data.category.toLowerCase() === c.toLowerCase())
//     );
//   };

//   const filterByPrice = (price) => {
//     setFilteredData(products.filter((data) => data.price >= price));
//   };

//   const handleSort = (e) => {
//     const order = e.target.value;
//     setSortOrder(order);

//     let sortedProducts = [...products];
//     if (order === "lowToHigh") {
//       sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (order === "highToLow") {
//       sortedProducts.sort((a, b) => b.price - a.price);
//     }
//     setFilteredData(sortedProducts);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     navigate(`/product/search/${searchItem}`);
//     setSearchItem("");
//   };

//   return (
//     <div className="nav sticky-top">
//       <div className="nav-bar">
//         <Link
//           to={"/"}
//           className="left"
//           style={{ textDecoration: "none", color: "white" }}
//         >
//           <h1>SHOPKART</h1>
//         </Link>
//         <form className="search-bar" onSubmit={submitHandler}>
//           <span className="material-symbols-outlined">search</span>
//           <input
//             type="text"
//             placeholder="Search Products..."
//             value={searchItem}
//             onChange={(e) => setSearchItem(e.target.value)}
//           />
//         </form>
//         <div className="right">
//           {isAuthenticated && (
//             <>
//               <Link
//                 to={"/cart"}
//                 type="button"
//                 className="btn btn-primary position-relative"
//               >
//                 <span className="material-symbols-outlined">shopping_cart</span>
//                 {cart?.items?.length > 0 && (
//                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                     {cart?.items?.length}
//                     <span className="visually-hidden">unread messages</span>
//                   </span>
//                 )}
//               </Link>
//               <Link to={"/profile"} className="btn btn-primary mx-3">
//                 {user?.name}
//               </Link>
//               <button
//                 className="btn btn-warning"
//                 onClick={() => {
//                   logout();
//                   navigate("/");
//                 }}
//               >
//                 logout
//               </button>
//             </>
//           )}
//           {!isAuthenticated && (
//             <>
//               <Link to={"/login"} className="btn btn-info mx-3">
//                 login
//               </Link>
//               <Link to={"/register"} className="btn btn-info mx-3">
//                 register
//               </Link>
//             </>
//           )}

//           {/* Admin Links */}
//           {!isAdminAuthenticated ? (
//             <Link to={"/admin/login"} className="btn btn-warning mx-3">
//               Admin Login
//             </Link>
//           ) : (
//             <>
//               {/* <Link to={"/admin/add"} className="btn btn-secondary mx-3">
//                 Add Product
//               </Link> */}
//               <button
//                 className="btn btn-danger mx-3"
//                 onClick={() => {
//                   adminLogout(); // Admin logout logic
//                   navigate("/");
//                 }}
//               >
//                 Admin Logout
//               </button>

//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
