import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { store } from "./utils/store";
import { Provider } from "react-redux";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import SignUp from "./components/SignUp";
import RequestedUser from "./components/RequestedUser";
import ConnectedUser from "./components/connectedUser";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/Reset-password";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/requested" element={<RequestedUser />} />
              <Route path="/connections" element={<ConnectedUser />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
