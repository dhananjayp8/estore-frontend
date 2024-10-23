import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { adminLogin, isAdminAuthenticated, setIsAuth } =
    useContext(AppContext); // Destructure the context
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });

  // Update state when input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { username, password } = loginUser;

    // Use the adminLogin function from context
    const isAuthenticated = await adminLogin(username, password);
    if (isAuthenticated) {
      toast.success("Login successful! Redirecting to Admin Panel...", {
        position: "top-right",
        autoClose: 3000, // Automatically close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      //   setIsAuth(true); // Set authentication state to true

      // Delay navigation until after toast is shown

      navigate("/admin"); // Redirect to AddProduct page on successful login
      // Wait for 3 seconds for toast
    } else {
      toast.error("Invalid credentials. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // If admin is already authenticated, redirect to AddProduct page
  if (isAdminAuthenticated) {
    navigate("/admin/add");
    return null; // Return null to prevent showing the login form
  }

  // Render login form if not authenticated
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
        <h1 className="text-center">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Username
            </label>
            <input
              name="username"
              value={loginUser.username}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={loginUser.password}
              onChange={onChangeHandler}
              type="password"
              className="form-control bg-dark text-light"
              id="password"
              required
            />
          </div>
          <div className="d-grid col-6 my-5 mx-auto">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
// import React, { useContext, useState, useEffect } from "react";
// import AppContext from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// const Login = () => {
//   const { adminLogin, isAdminAuthenticated, setIsAdminAuthenticated } =
//     useContext(AppContext); // Destructure the context
//   const navigate = useNavigate();
//   const [loginUser, setLoginUser] = useState({
//     username: "",
//     password: "",
//   });

//   // Update state when input changes
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setLoginUser({ ...loginUser, [name]: value });
//   };

//   // Handle form submission
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     const { username, password } = loginUser;

//     // Use the adminLogin function from context
//     const isAuthenticated = await adminLogin(username, password);
//     if (isAuthenticated) {
//       toast.success("Login successful! Redirecting to Admin Panel...", {
//         position: "top-right",
//         autoClose: 3000, // Automatically close after 3 seconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });

//       // Store the admin authentication state in localStorage
//       localStorage.setItem("isAdminAuthenticated", true);

//       // Delay navigation until after toast is shown
//       setTimeout(() => {
//         navigate("/admin"); // Redirect to Admin page on successful login
//       }, 1000); // Wait for 3 seconds for toast
//     } else {
//       toast.error("Invalid credentials. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   // Check if admin is authenticated on component mount (e.g., page refresh)
//   useEffect(() => {
//     const adminAuth = localStorage.getItem("isAdminAuthenticated");
//     if (adminAuth) {
//       setIsAdminAuthenticated(true);
//       navigate("/admin"); // Redirect to Admin page if already logged in
//     }
//   }, [setIsAdminAuthenticated, navigate]);

//   // If admin is already authenticated, redirect to Admin page
//   if (isAdminAuthenticated) {
//     navigate("/admin");
//     return null; // Return null to prevent showing the login form
//   }

//   // Render login form if not authenticated
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
//         <h1 className="text-center">Login</h1>
//         <form onSubmit={onSubmitHandler}>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Username
//             </label>
//             <input
//               name="username"
//               value={loginUser.username}
//               onChange={onChangeHandler}
//               type="text"
//               className="form-control bg-dark text-light"
//               id="email"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               name="password"
//               value={loginUser.password}
//               onChange={onChangeHandler}
//               type="password"
//               className="form-control bg-dark text-light"
//               id="password"
//               required
//             />
//           </div>
//           <div className="d-grid col-6 my-5 mx-auto">
//             <button type="submit" className="btn btn-primary">
//               Login
//             </button>
//           </div>
//         </form>
//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default Login;
// import React, { useContext, useState, useEffect } from "react";
// import AppContext from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// const Login = () => {
//   const { adminLogin, isAdminAuthenticated, setIsAdminAuthenticated } =
//     useContext(AppContext); // Destructure the context
//   const navigate = useNavigate();
//   const [loginUser, setLoginUser] = useState({
//     username: "",
//     password: "",
//   });

//   // Update state when input changes
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setLoginUser({ ...loginUser, [name]: value });
//   };

//   // Handle form submission
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     const { username, password } = loginUser;

//     // Use the adminLogin function from context
//     const isAuthenticated = await adminLogin(username, password);
//     if (isAuthenticated) {
//       toast.success("Login successful! Redirecting to Admin Panel...", {
//         position: "top-right",
//         autoClose: 3000, // Automatically close after 3 seconds
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });

//       // Store the admin authentication state in localStorage
//       localStorage.setItem("isAdminAuthenticated", true);

//       // Set isAdminAuthenticated to true in context
//       setIsAdminAuthenticated(true);

//       // Delay navigation until after toast is shown
//       setTimeout(() => {
//         navigate("/admin"); // Redirect to Admin page on successful login
//       }, 1000);
//     } else {
//       toast.error("Invalid credentials. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   // Check if admin is authenticated on component mount (e.g., page refresh)
//   useEffect(() => {
//     const adminAuth = localStorage.getItem("isAdminAuthenticated");
//     if (adminAuth) {
//       setIsAdminAuthenticated(true);
//       navigate("/admin"); // Redirect to Admin page if already logged in
//     }
//   }, [setIsAdminAuthenticated, navigate]);

//   // If admin is already authenticated, redirect to Admin page
//   if (isAdminAuthenticated) {
//     navigate("/admin");
//     return null; // Return null to prevent showing the login form
//   }

//   // Render login form if not authenticated
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
//         <h1 className="text-center">Login</h1>
//         <form onSubmit={onSubmitHandler}>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Username
//             </label>
//             <input
//               name="username"
//               value={loginUser.username}
//               onChange={onChangeHandler}
//               type="text"
//               className="form-control bg-dark text-light"
//               id="email"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               name="password"
//               value={loginUser.password}
//               onChange={onChangeHandler}
//               type="password"
//               className="form-control bg-dark text-light"
//               id="password"
//               required
//             />
//           </div>
//           <div className="d-grid col-6 my-5 mx-auto">
//             <button type="submit" className="btn btn-primary">
//               Login
//             </button>
//           </div>
//         </form>
//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default Login;
