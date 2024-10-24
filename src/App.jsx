import { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import AdminLogin from "./components/admin/AdminLogin";
import OrderConfirmation from "./components/OrderConfirmation";
import AddProduct from "./components/admin/AddProduct";
import AdminRoute from "./components/admin/AdminRoute";
import AdminPage from "./components/admin/AdminPage";
import AllUsers from "./components/admin/AllUsers";
import AdminProduct from "./components/admin/AdminProduct";
import EditProduct from "./components/admin/EditProduct";
import NotFound from "./components/NotFound";
function App() {
  const { data, isAdminAuthenticated } = useContext(AppContext);
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/search/:item" element={<SearchProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Address />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orderconfirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/allUsers"
            element={
              <AdminRoute>
                <AllUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/adminProducts"
            element={
              <AdminRoute>
                <AdminProduct />
              </AdminRoute>
            }
          />
          {/* <Route
          path="/admin/delete/:id"
          element={
            <AdminRoute>
              <DeleteProduct />
            </AdminRoute>
          }
        /> */}

          {/* 
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="/admin/add"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          
          <Route path="/admin/allUsers" element={<AllUsers />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
