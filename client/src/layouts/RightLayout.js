import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants/colors";

const RightLayout = ({ children, styles }) => {
  return (
    <RightLayoutContainer styles={styles}>{children}</RightLayoutContainer>
  );
};

export default RightLayout;

const RightLayoutContainer = styled.div`
  background: ${COLORS.authPage};
  color: #fff;
  width: 100%;
  padding: 2rem 1rem 0 0;
  border-radius: 0.8rem;
  @media screen and (min-width: 992px) {
    width: 50%;

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  transition: width 0.5s cubic-bezier(0.21, -0.47, 0.95, 0);
  ${(props) => props.styles};
`;
