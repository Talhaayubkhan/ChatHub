import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { LayoutLoaders } from "./components/layout/Loaders";

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
let user = true;
const App = () => {
  return (
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
      </BrowserRouter>
    </>
  );
};

export default App;
