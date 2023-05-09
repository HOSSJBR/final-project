import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import GlobalStyles from "./styles/GlobalStyles";

import {
  authRequest,
  authRequestFinished,
  clearUser,
  storeUser,
} from "./actions/userActions";
import ResumeEditorPage from "./pages/ResumeEditorPage";

import SafeRoute from "./routes/SafeRoute";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalcHeight from "./layouts/CalcHeight";

const App = () => {
  const height = 50;

  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    const requestProfileOnRefresh = async () => {
      const token = localStorage.getItem("userToken");
      dispatch(authRequest());

      try {
        if (token) {
          const { data } = await axios.get(`/api/users/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(storeUser(data.user));
        }
      } catch (err) {
        console.log(err);
        dispatch(clearUser());
      } finally {
        dispatch(authRequestFinished());
      }
    };

    requestProfileOnRefresh().catch(console.error);
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Navbar height={height} />
        <Routes>
          {/* Todo, add home section */}
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route
            path="/login"
            element={
              <CalcHeight height={height}>
                <LoginPage />
              </CalcHeight>
            }
          />
          <Route
            path="/signup"
            element={
              <CalcHeight height={height}>
                <SignupPage />
              </CalcHeight>
            }
          />

          <Route path="/users/:profileId" element={<UserDetailsPage />} />

          <Route
            path="/editor"
            element={
              <SafeRoute
                what={isAuth}
                GotoComponent={ResumeEditorPage}
                pathOtherwise="/login"
              />
            }
          />
          <Route
            path="/me"
            element={
              <SafeRoute
                what={isAuth}
                GotoComponent={ProfilePage}
                pathOtherwise="/login"
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer transition={Bounce} />
    </>
  );
};

export default App;
