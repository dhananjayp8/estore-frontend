import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const AdminRoute = ({ children }) => {
  const { isAdminAuthenticated } = useContext(AppContext);

  // Redirect to admin login if not authenticated
  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;
