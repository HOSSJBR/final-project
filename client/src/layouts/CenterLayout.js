import React from "react";
import styled from "styled-components";

const CenterLayout = ({ children, styles }) => {
  return <CenterContainer styles={styles}>{children}</CenterContainer>;
};

const CenterContainer = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
  ${(props) => props.styles}
`;

export default CenterLayout;
