import React from "react";
import styled from "styled-components";

const ResumeLabel = ({ children, ...rest }) => {
  return <StyledLabel {...rest}>{children}</StyledLabel>;
};

const StyledLabel = styled.label`
  color: #c9c9c9;
  font-size: 0.8rem;
`;

export default ResumeLabel;
