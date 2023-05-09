import React from "react";
import styled from "styled-components";

const FlexColumn = ({ children, gap }) => {
  return <StyledFlexColumn style={{ gap }}>{children}</StyledFlexColumn>;
};

const StyledFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export default FlexColumn;
