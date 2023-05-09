import React from "react";
import styled from "styled-components";
import Image from "../assets/logo.png";

const LeftLayout = ({ children }) => {
  return <LeftLayoutContainer>{children}</LeftLayoutContainer>;
};

const LeftLayoutContainer = styled.div`
  display: none;
  width: 50%;
  background: url(${Image}) center/contain no-repeat,
    linear-gradient(to bottom, #a76bdcb8, #ca85ffe6);
  border-top-left-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  @media screen and (min-width: 992px) {
    display: block;
  }
`;

export default LeftLayout;
