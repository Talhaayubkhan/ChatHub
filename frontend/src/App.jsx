import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LayoutLoaders } from "./components/layout/Loaders";
import server from "./constants/config.js";
import { userExists, userNotExists } from "./redux-toolkit/reducers/reducerAuth.js";
import { SocketProvider } from "./socket.jsx";

// Lazy loading components for better performance
const Home = lazy(() => import("./pages/Home"));
const AuthForm = lazy(() => import("./pages/AuthForm"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin Routes - Lazy loaded
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminUserManagement = lazy(() => import("./pages/admin/UsersManagement"));
const AdminChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const AdminMessageManagement = lazy(() => import("./pages/admin/MessagManagement"));

/**
 * Main App component that sets up routing and authentication checks.
 * Fetches user data on mount and protects routes accordingly.
 */
const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch user data on app initialization
  useEffect(() => {
    axios
      .get(`${server}/api/v1/auth/user`, { withCredentials: true })
      .then((res) => {
        const userData = res.data.user;
        if (!userData) {
          toast.error("User data is not available");
          return;
        }
        dispatch(userExists(userData));
      })
      .catch(() => {
        dispatch(userNotExists());
      });
  }, [dispatch]);

  // Show loader while fetching user data
  if (loader) {
    return <LayoutLoaders />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          {/* Protected Routes - Only accessible when user is logged in */}
          <Route
            element={
              <SocketProvider>
                <ProtectedRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Group />} />
          </Route>

          {/* Auth Routes - Only accessible when user is NOT logged in */}
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <AuthForm />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/user" element={<AdminUserManagement />} />
          <Route path="/admin/chat" element={<AdminChatManagement />} />
          <Route path="/admin/message" element={<AdminMessageManagement />} />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-center" />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
