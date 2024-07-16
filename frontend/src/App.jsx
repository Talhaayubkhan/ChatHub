import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LayoutLoaders } from "./components/layout/Loaders";
import { server } from "./constants/config.js";
import { userNotExists } from "./redux-toolkit/reducers/reducerAuth.js";

// Lazy loading components
// we use Lazy loading, it helps web apps to load faster by only loading the parts of the website you need when you need them, making everything quicker and smoother.
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
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
// let user = true;
const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(server);
    axios
      .get(`${server}/api/v1/auth/user`, { withCredentials: true })
      .then((res) => console.log(res))
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
    <LayoutLoaders />
  ) : (
    <>
      <BrowserRouter>
        {/* Wrap Routes with Suspense to handle lazy loading */}
        <Suspense fallback={<LayoutLoaders />}>
          <Routes>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:chatid" element={<Chat />} />
              <Route path="/groups" element={<Group />} />
            </Route>
            {/* Route for Login */}
            <Route
              path="/login"
              element={
                <ProtectedRoute user={!user} redirect="/">
                  <Login />
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
        </Suspense>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
