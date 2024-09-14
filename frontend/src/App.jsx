import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LayoutLoaders } from "./components/layout/Loaders";
import server from "./constants/config.js";
import {
  userExists,
  userNotExists,
} from "./redux-toolkit/reducers/reducerAuth.js";
import { SocketProvider } from "./socket.jsx";

// Lazy loading components
const Home = lazy(() => import("./pages/Home"));
const AuthForm = lazy(() => import("./pages/AuthForm"));
// const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin Routes
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminUserManagement = lazy(() => import("./pages/admin/UsersManagement"));
const AdminChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const AdminMessageManagement = lazy(() =>
  import("./pages/admin/MessagManagement")
);

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(server);

    axios
      .get(`${server}/api/v1/auth/user`, { withCredentials: true })
      .then((res) => {
        const userData = res.data.user;
        // console.log(userData);

        if (!userData) {
          toast.error("User data is not available", userData);
          return;
        }
        dispatch(userExists(userData));
      })
      .catch(() => {
        dispatch(userNotExists());
        // console.error("Error fetching user:", error.message);
      });
  }, [dispatch]);

  return loader ? (
    <LayoutLoaders />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          {/* Protected Routes */}
          <Route
            element={
              <SocketProvider>
                <ProtectedRoute user={user} />{" "}
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Group />} />
          </Route>
          {/* Route for AuthForm (Login/Signup) */}
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
          {/* NotFound Route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-center" />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
