import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy loading components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Groups"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* Wrap Routes with Suspense to handle lazy loading */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/group" element={<Group />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
