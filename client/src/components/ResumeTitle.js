import React from "react";
import styled from "styled-components";

const ResumeTitle = ({ children, ...rest }) => {
  return <Heading {...rest}>{children}</Heading>;
};

const Heading = styled.h1`
  color: #000;
  font-size: 2rem;
`;

export default ResumeTitle;
