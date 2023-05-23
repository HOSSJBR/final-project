import axios from "axios";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import GlobalStyles from "./styles/GlobalStyles";

import ResumeEditorPage from "./pages/ResumeEditorPage";

import SafeRoute from "./routes/SafeRoute";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalcHeight from "./layouts/CalcHeight";
import { AppContext } from "./context/AppContext";

const App = () => {
	const height = 50;

	const {
		state: { user, isAuth },
		actions: { storeUser, authRequestFinished, authRequest, clearUser },
	} = useContext(AppContext);

	useEffect(() => {
		const requestProfileOnRefresh = async () => {
			const token = localStorage.getItem("userToken");
			authRequest();

			try {
				if (token) {
					const { data } = await axios.get(`/api/users/me`, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});
					storeUser(data.user);
				}
			} catch (err) {
				console.log(err);
				clearUser();
			} finally {
				authRequestFinished();
			}
		};

		requestProfileOnRefresh().catch(console.error);
	}, []);

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
