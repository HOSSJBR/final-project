import React, { useContext, useEffect, useMemo, useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { HiAtSymbol } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import styled, { css } from "styled-components";
import FlexRow from "../layouts/FlexRow";

import { Button, FormGroup, Input, Label } from "../components/Form";
import MainSplitLayout from "../layouts/MainSplitLayout";

import {
	fadeKeyframe,
	getAnimatedLogo,
	scaleKeyframe,
	slideKeyFrame,
} from "../animations/animations";

import axios from "axios";
import RightLayout from "../layouts/RightLayout";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext";

const AnimatedAtSymbol = getAnimatedLogo(
	HiAtSymbol,
	fadeKeyframe,
	"0.5s normal forwards ease"
);
const AnimatedPassSymbol = getAnimatedLogo(
	MdPassword,
	fadeKeyframe,
	"0.5s normal forwards ease"
);

const AnimatedCheckSymbol = getAnimatedLogo(
	FcCheckmark,
	slideKeyFrame,
	"0.5s normal forwards ease"
);
const AnimatedCrossSymbol = getAnimatedLogo(
	RxCross2,
	slideKeyFrame,
	"0.5s normal forwards ease"
);

const fullpageFlexCSS = css`
	flex-grow: 0;
	flex-shrink: 0;
	width: 100% !important;

	border-radius: 0.8rem !important;

	animation: ${scaleKeyframe} 0.3s ease forwards 0.7s;
`;

const LoginPage = () => {
	const {
		actions: { authRequest, storeUser },
	} = useContext(AppContext);

	const emptyForm = {
		username: "",
		password: "",
	};

	const [formData, setFormData] = useState({
		...emptyForm,
	});
	const isUsernameError =
		formData.username.length >= 1 && formData.username.length < 2;
	const isPasswordError =
		formData.password.length === 1 ||
		(formData.password.length < 8 && formData.password.length !== 0);
	const [isLoading, setIsLoading] = useState(false);
	const [isFormError, setIsFormError] = useState(false);

	const [showAlert, setShowAlert] = useState(false);
	const [alertBody, setAlertBody] = useState("");
	const [status, setStatus] = useState();

	const navigate = useNavigate();

	const handleSubmitForm = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			authRequest();
			const { data } = await axios.post("/api/users/login", formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			setStatus(data.status);
			setAlertBody(data.message);

			storeUser({
				...data.user,
				token: data.user.token,
			});

			if (data.status === 200) {
				setTimeout(() => {
					navigate("/editor");
				}, 3000);
			}
		} catch (err) {
			console.log(err);
			setStatus(err.response.data.status);
			setAlertBody(err.response.data.message);
		} finally {
			setIsLoading(false);
			setShowAlert(true);
		}
	};

	const isInvalidForm = !Object.keys(formData).some(
		(key) => !formData[key].trim().length === 0
	);

	useEffect(() => {
		setIsFormError(isInvalidForm);
	}, []);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

		setIsFormError(isUsernameError || isPasswordError);
	};

	const memoedAtSymbolLogo = useMemo(
		() => <AnimatedAtSymbol key={"animateAt"} size="1.5rem" />,
		[]
	);
	const memoedPassLogo = useMemo(
		() => <AnimatedPassSymbol key={"animatePass"} size="1.5rem" />,
		[]
	);

	const memoedCheck = useMemo(
		() => <AnimatedCheckSymbol key={"animateCheck"} size="1.5rem" />,
		[]
	);
	const memoedCross = useMemo(
		() => (
			<AnimatedCrossSymbol color="red" key={"animateCross"} size="1.5rem" />
		),
		[]
	);

	const memoedCheckUsername = useMemo(
		() => <AnimatedCheckSymbol key={"animateCheckUsername"} size="1.5rem" />,
		[]
	);
	const memoedCrossUsername = useMemo(
		() => (
			<AnimatedCrossSymbol
				color="red"
				key={"animateCrossUsername"}
				size="1.5rem"
			/>
		),
		[]
	);

	const ButtonCSS = css`
		justify-self: start;
		padding: 0.25rem 2rem;
		border-radius: 0.33rem;
		background: green;
		width: 100%;
		&:disabled {
			border: 2px outset ButtonFace;
			color: gray;
			cursor: inherit;
			background: #ddd;
			cursor: not-allowed;
		}
	`;

	if (showAlert) {
		const toastType = status === 200 ? toast.success : toast.error;
		toastType(alertBody, {
			toastId: "apiError",
			position: toast.POSITION.TOP_CENTER,
			autoClose: 3000,
			closeOnClick: true,
		});
		setShowAlert(false);
	}
	return (
		<MainSplitLayout>
			<RightLayout styles={status === 200 ? fullpageFlexCSS : null}>
				<FormContainer onSubmit={handleSubmitForm}>
					<div>
						<Button
							type="button"
							onClick={() => navigate("/signup")}
							style={{
								borderTopLeftRadius: "3px",
								borderBottomLeftRadius: "3px",
							}}
						>
							Signup
						</Button>
						<Button
							type="button"
							onClick={() => navigate("/login")}
							style={{
								borderTopRightRadius: "3px",
								borderBottomRightRadius: "3px",
							}}
						>
							Login
						</Button>
					</div>
					<FormGroup>
						<Label>
							<FlexRow styles={CustomRow}>
								{formData.username.length > 0 && memoedAtSymbolLogo}
								Username
								{formData.username.length !== 0 && formData.username.length < 2
									? memoedCrossUsername
									: formData.username.length > 2 && memoedCheckUsername}
							</FlexRow>
						</Label>
						<Input
							maxLength={16}
							err={isUsernameError}
							type="text"
							value={formData.username}
							name="username"
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>
							<FlexRow styles={CustomRow}>
								{formData.password.length > 0 && memoedPassLogo}
								Password
								{formData.password.length !== 0 && formData.password.length < 8
									? memoedCross
									: formData.password.length > 8 && memoedCheck}
							</FlexRow>
						</Label>
						<Input
							err={isPasswordError}
							type="password"
							value={formData.password}
							name="password"
							onChange={handleChange}
							maxLength={32}
						/>
					</FormGroup>

					<Button disabled={isLoading || isFormError} styles={ButtonCSS}>
						{isLoading ? "Submitting" : "Login"}
					</Button>
				</FormContainer>
			</RightLayout>
		</MainSplitLayout>
	);
};
const FormContainer = styled.form`
	padding: 0 2rem;
	width: 100%;
	display: grid;
	place-items: center;
	height: 100%;
	align-content: center;
	gap: 2rem;
`;

const CustomRow = css`
	gap: 1rem;
	align-items: center;
`;

export default LoginPage;
