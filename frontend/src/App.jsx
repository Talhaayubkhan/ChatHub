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

let user = true;

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* Wrap Routes with Suspense to handle lazy loading */}
        <Suspense fallback={<LayoutLoaders />}>
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/groups" element={<Group />} />
            </Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute user={!user} redirect="/">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
