import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LayoutLoaders } from "./components/layout/Loaders";
import server from "./constants/config.js";
import { userNotExists } from "./redux-toolkit/reducers/reducerAuth.js";

// Lazy loading components
const Home = lazy(() => import("./pages/Home"));
const AuthForm = lazy(() => import("./pages/AuthForm"));
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
    axios
      .get(`${server}/api/v1/auth/user`, { withCredentials: true })
      .then((res) => console.log(res))
      .catch(() => {
        dispatch(userNotExists());
      });
  }, [dispatch]);

  return loader ? (
    <LayoutLoaders />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatid" element={<Chat />} />
            <Route path="/groups" element={<Group />} />
          </Route>
          {/* Route for AuthForm (Login/Signup) */}
          <Route
            path="/auth"
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
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
