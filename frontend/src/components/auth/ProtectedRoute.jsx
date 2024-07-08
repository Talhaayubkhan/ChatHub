import { Navigate, Outlet } from "react-router-dom";

// Defining a functional component called ProtectedRoute
// It takes three props: children, user, and redirect
// children represents the nested components or elements within <ProtectedRoute>
// user indicates whether the user is authenticated
// redirect is the path where the user should be redirected if not authenticated (defaults to "/login")
const ProtectedRoute = ({ children, user, redirect = "/login" }) => {
  // Checking if the user is not authenticated
  if (!user) {
    // If not authenticated, redirect the user to the specified redirect path
    return <Navigate to={redirect} />;
  }

  // If user is authenticated, render the nested components or elements
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
