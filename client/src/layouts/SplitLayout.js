import React from "react";
import styled from "styled-components";

const SplitLayout = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

const LayoutContainer = styled.div`
  display: flex;
  height: 80vh;
  width: 70vw;
`;

export default SplitLayout;
