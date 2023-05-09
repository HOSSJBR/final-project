import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import styled, { css } from "styled-components";

import PrivateAccount from "../components/PrivateAccount";

import { io } from "socket.io-client";
import ProfileLoader from "../loaders/ProfileLoader";

import moment from "moment";

import { useSelector } from "react-redux";

const socket = io("http://localhost:5500");

const UserDetailsPage = () => {
  const params = useParams();

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState();

  const { color } = useSelector((state) => state.resume);

  useEffect(() => {
    const username = params.profileId.split("@")[1];

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${username}`);

        setUser(data.user);
        setStatus(data.status);
      } catch (err) {
        setStatus(err.response.data.status);
      }
    };

    fetchUser().catch(console.error);

    socket.on("connect", () => {
      socket.on("onStatusChange", (updatedUser) => {
        setUser(updatedUser);
      });
    });
  }, [params]);

  if (status === 404) {
    return <Navigate to={"/login"} />;
  }

  const getDate = (user) => {
    if (user.profile.status === "ONLINE") {
      return "Online";
    }

    const dateStamp = user.profile.lastSeen;
    const momentDate = moment(dateStamp);
    const currentDate = moment(Date.now());
    const isToday = momentDate.day() === currentDate.day();

    const isYesterday = momentDate.day() === currentDate.subtract(1, "days");
    const aLongTimeAgo = momentDate.format("LLL");
    return isToday
      ? `Today at ${momentDate.format("LT")}`
      : isYesterday
      ? `Yesterday at ${momentDate.format("LT")}`
      : aLongTimeAgo;
  };

  const bioBackground = color ? color : `#6A56B4`;
  return !user ? (
    <ProfileLoader />
  ) : (
    <>
      <CenterLayout styles={CenterExtended}>
        <BoxContainer>
          <TextCenter>
            <ImageContainer>
              <ProfileImage src={user.imageLinks.url} alt="" />
              <Status
                color={user.profile.status === "ONLINE" ? " #00f6a1" : "red"}
              />
            </ImageContainer>
            <Username>@{user.username}</Username>
            <Description>{user.category}</Description>
            <Description>{getDate(user)}</Description>
            <BioText style={{ background: bioBackground }}>{user.bio}</BioText>
          </TextCenter>
          <SocialContainer>
            <SocialItem>
              <p>Follows</p>
              <p>-</p>
            </SocialItem>
            <SocialItem>
              <p>Follows</p>
              <p>-</p>
            </SocialItem>
            <SocialItem>
              <p>Status</p>
              <p>{user.profile.isEmployed ? "Employed" : "Unemployed"}</p>
            </SocialItem>
          </SocialContainer>
        </BoxContainer>
        {user.profile.isPrivate && <PrivateAccount />}
        <PrivateAccount />
      </CenterLayout>
    </>
  );
};

const Status = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: ${(props) => props.color};
  position: absolute;

  border: 3px solid #fff;
  left: 50%;
  bottom: 0%;
  transform: translate(50%, 0);
`;
const ImageContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
`;
const ProfileImage = styled.img`
  border-radius: 50%;
  height: 150px;
  width: 150px;
`;
const BioText = styled.p`
  padding: 1rem;
  color: #fff;
  max-width: 90%;
  border: 0;
  border-radius: 7px;
  margin: 0 auto;
`;

const CenterLayout = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialContainer = styled.div`
  margin: 2rem 0;
  @media screen and (min-width: 772px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem 2rem;
  }
  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
`;
const SocialItem = styled.div`
  text-align: center;
  font: "Noto Sans";
  font-size: 1.5rem;

  color: #000;
  @media screen and (max-width: 772px) {
    margin-bottom: 1rem;
  }

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CenterExtended = css`
  height: 100vh;
  align-items: start;
  margin: 2rem 0;
`;

const TextCenter = styled.div`
  text-align: center;
`;

const Username = styled.h1`
  font-family: "Noto Sans";
  font-weight: 500;
  font-size: 2em;
`;
const Description = styled.h4`
  font-family: "Noto Sans";
  font-weight: 300;
  font-size: 1.2em;
  margin: 1rem 0;
  color: #cfcfcf;
`;
const BoxContainer = styled.div`
  margin: 0 auto;
  padding: 0.5rem;
  background: #fff;
  border-radius: 0.6rem;

  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  width: 80%;
`;

export default UserDetailsPage;
