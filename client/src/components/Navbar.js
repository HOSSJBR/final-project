import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";

import { RiArrowDropDownLine, RiDraftLine } from "react-icons/ri";

import axios from "axios";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { dropDownKeyFrame } from "../animations/animations";
import { AppContext } from "../context/AppContext";

const Navbar = ({ height }) => {
	//   const { user, isAuth } = useSelector((state) => state.user);
	//   const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		state: { user, isAuth },
		actions: { logoutUser },
	} = useContext(AppContext);

	console.log(useContext(AppContext));

	const [dropDown, setDropDown] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [searchedUsers, setSearchedUsers] = useState();
	const [showList, setShowList] = useState(false);

	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			await axios.get("/api/users/logout", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
				},
			});
			logoutUser();
			navigate("/login");
			window.localStorage.removeItem("resumeData");
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoggingOut(false);
		}
	};

	useEffect(() => {
		let isMounted = true;

		setShowList(true);

		const getMatchedUsers = async () => {
			try {
				const { data } = await axios.get(`/api/search?term=${searchInput}`);
				if (data.status === 200) {
					setSearchedUsers(data.users);
				}
			} catch (err) {
				console.log(err);
			}
		};

		if (isMounted && searchInput) {
			setSearchedUsers(undefined);
			getMatchedUsers().catch(console.error);
		}

		const listener = () => {
			setShowList(false);
		};
		window.addEventListener("click", listener);

		return () => {
			isMounted = false;
			setShowList(false);

			window.removeEventListener("click", listener);
		};
	}, [searchInput]);

	return (
		<NavbarFixed style={{ height: `${height}px` }}>
			<NavbarContainer>
				<StyledLogoIcon onClick={() => navigate("/")} />

				<div style={{ position: "relative", width: "50%" }}>
					<StyledSearch
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder="Search for users"
					/>
					{searchInput &&
						searchedUsers &&
						searchedUsers.length !== 0 &&
						showList && (
							<DropDownContainer>
								<DropDownItem>
									{searchedUsers.map((eachUser, index) => (
										<StyledLink
											key={index}
											onClick={() => {
												setShowList(false);
												setSearchInput("");
											}}
											to={
												user && eachUser.username === user.username
													? "/me"
													: `/users/@${eachUser.username}`
											}
										>
											<DropDownUser key={eachUser._id}>
												<h1>{eachUser.username}</h1>
												<p>{eachUser.profile.status}</p>
												<img src={eachUser.imageLinks.url} alt="" />
											</DropDownUser>
										</StyledLink>
									))}
								</DropDownItem>
							</DropDownContainer>
						)}
				</div>

				{isAuth && (
					<UserNavInfo>
						<NavImage src={user.imageLinks.url} alt="UserNavImage" />
						<ProfileNav>
							<UserFullName>
								{user.fname + " " + user.lname}
								<RiArrowDropDownLine
									style={{
										transform: `${!dropDown ? "none" : "rotate(180deg)"} `,
										cursor: "pointer",
									}}
									size={"2rem"}
									onClick={() => {
										setDropDown(!dropDown);
									}}
								/>
							</UserFullName>
							<UserHandle>@{user.username}</UserHandle>

							{dropDown && (
								<DropDownContainer style={{ gap: "2rem" }}>
									<DropDownItem>
										<DropDownLink onClick={() => setDropDown(false)} to={"/me"}>
											Go to profile
										</DropDownLink>
									</DropDownItem>
									<DropDownItem>
										<DropDownLink
											onClick={() => setDropDown(false)}
											to={"/editor"}
										>
											Edit/Create CV
										</DropDownLink>
									</DropDownItem>
									<DropDownItem>
										<DropDownLink
											style={{ color: "#ff0000" }}
											onClick={handleLogout}
										>
											<div
												style={{
													display: "inline-flex",
													alignSelf: "center",
												}}
											>
												<CiLogout style={{ marginRight: "0.5rem" }} />{" "}
												{isLoggingOut ? "Loading..." : "Logout"}
											</div>
										</DropDownLink>
									</DropDownItem>
								</DropDownContainer>
							)}
						</ProfileNav>
					</UserNavInfo>
				)}
			</NavbarContainer>
		</NavbarFixed>
	);
};

const StyledSearch = styled.input`
	border: none;
	outline: none;
	border: 1px solid #000;
	border-radius: 3px;
	background: none;
	width: 100%;
	color: #fff;
	font-size: 1rem;
	padding: 0.6em;
	position: relative;

	font-family: "Noto Sans";

	&::placeholder {
		color: #8c8c8c;
		font-size: 0.8rem;
	}
`;

const StyledLogoIcon = styled(RiDraftLine)`
	color: #fff;
	font-size: 3rem;
	display: none;
	cursor: pointer;
	@media screen and (min-width: 992px) {
		display: block;
	}
`;

const DropDownUser = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100% !important;
	& img {
		height: 50px;
		width: 50px;
		border-radius: 50%;
	}

	& > * {
		width: 100%;
	}
`;

const StyledLink = styled(Link)`
	unset: all;
	text-decoration: none;
	color: #000;
`;

const DropDownContainer = styled.ul`
	position: absolute;
	left: 0;
	top: 90%;
	border: 2px solid #000;
	padding: 0.5rem;
	width: 100%;
	color: #000;
	border-radius: 0 0 3px 3px;
	background: #fff;
	animation: ${dropDownKeyFrame} 0.3s ease-out forwards;
	z-index: 100;
`;

const DropDownItem = styled.li`
	color: #000;
	&:not(:last-child) {
		margin-bottom: 1rem;
	}
`;

const DropDownLink = styled(Link)`
	text-decoration: none;
	color: #000;
`;

const NavbarFixed = styled.div`
	width: 100%;
	background: #502acd;
	z-index: 22;
`;
const NavbarContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1em;
	padding: 0 0.5em;
	height: 100%;

	@media screen and (min-width: 992px) {
		padding: 0 1em;
		gap: 2rem;
	}
`;

const NavImage = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;
const UserNavInfo = styled.div`
	display: flex;
	align-items: center;
`;
const ProfileNav = styled.div`
	position: relative;
	margin-left: 0.5em;
	padding: 0.5em 0;

	@media screen and (min-width: 992px) {
		padding-right: 2rem;
		margin-left: 2rem;
	}
`;

const UserFullName = styled.h1`
	display: flex;
	align-items: center;
	text-align: left;
	color: #fff;
`;
const UserHandle = styled.p`
	color: #fff;
`;

export default Navbar;
